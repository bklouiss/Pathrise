# app/routes/jobs.py
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Dict, Optional
from app.services.job_scraper_service import JobScraperService

router = APIRouter()

class JobSearchRequest(BaseModel):
    job_title: str
    location: Optional[str] = "United States"
    limit: Optional[int] = 10

class SkillsGapRequest(BaseModel):
    user_skills: Dict  # Skills from resume parsing
    job_title: str
    location: Optional[str] = "United States"

@router.post("/search")
async def search_jobs(request: JobSearchRequest):
    """Search for jobs and analyze requirements"""
    
    if not request.job_title.strip():
        raise HTTPException(status_code=400, detail="Job title is required")
    
    try:
        results = await JobScraperService.search_jobs(
            job_title=request.job_title,
            location=request.location,
            limit=request.limit
        )
        
        if "error" in results:
            raise HTTPException(status_code=500, detail=results["error"])
        
        return {
            "message": "Job search completed successfully",
            "data": results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Job search failed: {str(e)}")

@router.post("/skills-gap-analysis")
async def analyze_skills_gap(request: SkillsGapRequest):
    """Analyze skills gap between user and job market"""
    
    try:
        # First, get job requirements
        job_results = await JobScraperService.search_jobs(
            job_title=request.job_title,
            location=request.location,
            limit=15  # Get more jobs for better analysis
        )
        
        if "error" in job_results:
            raise HTTPException(status_code=500, detail=job_results["error"])
        
        # Perform skills gap analysis
        gap_analysis = JobScraperService.get_skills_gap_analysis(
            user_skills=request.user_skills,
            job_requirements=job_results["top_skills_required"]
        )
        
        return {
            "message": "Skills gap analysis completed",
            "job_search": {
                "title": request.job_title,
                "location": request.location,
                "jobs_analyzed": job_results["jobs_found"]
            },
            "analysis": gap_analysis,
            "recommendations": {
                "priority_focus": gap_analysis["skill_categories_to_focus"],
                "next_steps": JobScraperService._generate_learning_recommendations(
                    gap_analysis["missing_skills"][:5]
                )
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Skills gap analysis failed: {str(e)}")

@router.get("/trending-skills")
async def get_trending_skills(
    field: str = Query(..., description="CS field (software, data, hardware)"),
    location: str = Query("United States", description="Job location")
):
    """Get trending skills for a specific CS field"""
    
    field_to_title = {
        "software": "Software Engineer",
        "data": "Data Scientist", 
        "hardware": "Hardware Engineer",
        "frontend": "Frontend Developer",
        "backend": "Backend Developer",
        "fullstack": "Full Stack Developer",
        "ml": "Machine Learning Engineer"
    }
    
    job_title = field_to_title.get(field.lower())
    if not job_title:
        raise HTTPException(
            status_code=400, 
            detail=f"Unsupported field. Choose from: {list(field_to_title.keys())}"
        )
    
    try:
        results = await JobScraperService.search_jobs(
            job_title=job_title,
            location=location,
            limit=20
        )
        
        if "error" in results:
            raise HTTPException(status_code=500, detail=results["error"])
        
        # Get top 15 skills
        top_skills = dict(list(results["top_skills_required"].items())[:15])
        
        return {
            "field": field,
            "job_title_searched": job_title,
            "location": location,
            "jobs_analyzed": results["jobs_found"],
            "trending_skills": top_skills,
            "skill_insights": {
                "most_demanded": list(top_skills.keys())[:5],
                "emerging_trends": JobScraperService._identify_emerging_trends(top_skills),
                "skill_categories": JobScraperService._categorize_skills(list(top_skills.keys()))
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Trending skills analysis failed: {str(e)}")

@router.get("/quick-analysis")
async def quick_job_analysis(
    title: str = Query(..., description="Job title to analyze"),
    location: str = Query("United States", description="Location")
):
    """Quick job market analysis for a specific role"""
    
    try:
        results = await JobScraperService.search_jobs(
            job_title=title,
            location=location,
            limit=5
        )
        
        if "error" in results:
            raise HTTPException(status_code=500, detail=results["error"])
        
        # Quick insights
        top_5_skills = dict(list(results["top_skills_required"].items())[:5])
        
        return {
            "job_title": title,
            "location": location,
            "summary": {
                "jobs_found": results["jobs_found"],
                "top_skills": top_5_skills,
                "avg_skills_per_job": round(results["total_skills_mentioned"] / results["jobs_found"], 1) if results["jobs_found"] > 0 else 0
            },
            "market_insights": {
                "skill_demand_level": "High" if len(top_5_skills) >= 8 else "Medium" if len(top_5_skills) >= 5 else "Low",
                "competition_level": "High" if sum(top_5_skills.values()) >= 15 else "Medium" if sum(top_5_skills.values()) >= 8 else "Low"
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Quick analysis failed: {str(e)}")