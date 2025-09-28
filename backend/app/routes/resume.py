# app/routes/resume.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.resume_parser_service import ResumeParserService
from typing import Dict

router = APIRouter()

@router.post("/upload", response_model=Dict)
async def upload_resume(file: UploadFile = File(...)):
    """Upload and parse a resume file"""
    
    # Validate file type
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file selected")
    
    allowed_extensions = ['.pdf', '.docx', '.txt']
    if not any(file.filename.lower().endswith(ext) for ext in allowed_extensions):
        raise HTTPException(
            status_code=400, 
            detail="Unsupported file type. Please upload PDF, DOCX, or TXT files."
        )
    
    # Parse resume
    result = await ResumeParserService.parse_resume(file)
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    
    return {
        "message": "Resume parsed successfully",
        "data": result
    }

@router.post("/analyze-skills")
async def analyze_skills(file: UploadFile = File(...)):
    """Quick skills analysis from resume"""
    
    result = await ResumeParserService.parse_resume(file)
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    
    # Return only skills analysis
    return {
        "filename": result.get("filename"),
        "skills_found": result.get("skills", {}),
        "total_skills": sum(len(skills) for skills in result.get("skills", {}).values()),
        "education": result.get("education", []),
        "experience": result.get("experience", {})
    }