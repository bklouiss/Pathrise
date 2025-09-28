# app/routes/auth.py
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel, EmailStr
from typing import Dict, Optional
from app.services.auth_service import AuthService

router = APIRouter()

class RegisterRequest(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = ""

class LoginRequest(BaseModel):
    email: str
    password: str

class ProfileUpdateRequest(BaseModel):
    resume_data: Optional[Dict] = None
    target_jobs: Optional[list] = None
    learning_progress: Optional[Dict] = None

# Dependency to get current user from token
async def get_current_user(authorization: str = Header(None)):
    """Extract user from Authorization header"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")
    
    try:
        # Expect format: "Bearer <token>"
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    user_id = AuthService.verify_access_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user = AuthService.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

@router.post("/register")
async def register(request: RegisterRequest):
    """Register a new user account"""
    
    result = AuthService.register_user(
        email=request.email,
        password=request.password,
        full_name=request.full_name
    )
    
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return result

@router.post("/login")
async def login(request: LoginRequest):
    """Login user and return access token"""
    
    result = AuthService.login_user(
        email=request.email,
        password=request.password
    )
    
    if "error" in result:
        raise HTTPException(status_code=401, detail=result["error"])
    
    return result

@router.get("/me")
async def get_current_user_info(current_user: Dict = Depends(get_current_user)):
    """Get current user profile information"""
    return {
        "message": "User profile retrieved successfully",
        "user": current_user
    }

@router.put("/profile")
async def update_profile(
    request: ProfileUpdateRequest,
    current_user: Dict = Depends(get_current_user)
):
    """Update user profile data"""
    
    # Prepare updates
    updates = {}
    if request.resume_data is not None:
        updates["resume_data"] = request.resume_data
    if request.target_jobs is not None:
        updates["target_jobs"] = request.target_jobs
    if request.learning_progress is not None:
        updates["learning_progress"] = request.learning_progress
    
    if not updates:
        raise HTTPException(status_code=400, detail="No updates provided")
    
    result = AuthService.update_user_profile(current_user["user_id"], updates)
    
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return result

@router.post("/save-skills-analysis")
async def save_skills_analysis(
    analysis_data: Dict,
    current_user: Dict = Depends(get_current_user)
):
    """Save skills gap analysis to user history"""
    
    result = AuthService.add_skills_gap_analysis(current_user["user_id"], analysis_data)
    
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return result

@router.get("/skills-history")
async def get_skills_history(current_user: Dict = Depends(get_current_user)):
    """Get user's skills gap analysis history"""
    
    return {
        "message": "Skills history retrieved successfully",
        "user_id": current_user["user_id"],
        "skills_gap_history": current_user["profile"]["skills_gap_history"],
        "total_analyses": len(current_user["profile"]["skills_gap_history"])
    }

@router.get("/dashboard")
async def get_user_dashboard(current_user: Dict = Depends(get_current_user)):
    """Get user dashboard data"""
    
    profile = current_user["profile"]
    
    # Calculate dashboard metrics
    total_analyses = len(profile["skills_gap_history"])
    latest_analysis = profile["skills_gap_history"][-1] if profile["skills_gap_history"] else None
    
    # Get improvement trend if multiple analyses
    improvement_trend = None
    if total_analyses >= 2:
        first_analysis = profile["skills_gap_history"][0]
        latest_analysis_data = profile["skills_gap_history"][-1]
        
        first_match = first_analysis.get("match_percentage", 0)
        latest_match = latest_analysis_data.get("match_percentage", 0)
        improvement_trend = latest_match - first_match
    
    return {
        "message": "Dashboard data retrieved successfully",
        "user": {
            "name": current_user["full_name"] or current_user["email"],
            "email": current_user["email"],
            "member_since": current_user["created_at"]
        },
        "analytics": {
            "total_skill_analyses": total_analyses,
            "latest_match_percentage": latest_analysis.get("match_percentage", 0) if latest_analysis else 0,
            "improvement_trend": improvement_trend,
            "target_jobs_count": len(profile["target_jobs"])
        },
        "recent_activity": {
            "latest_analysis": latest_analysis,
            "target_jobs": profile["target_jobs"][-3:] if profile["target_jobs"] else [],
            "learning_progress": profile["learning_progress"]
        }
    }

# Admin/Debug endpoints
@router.get("/admin/users")
async def get_all_users():
    """Get all users (for admin/debug purposes)"""
    # In production, add admin authentication
    return AuthService.get_all_users()

@router.delete("/admin/reset-users")
async def reset_all_users():
    """Reset all users (for testing purposes)"""
    # In production, add admin authentication and confirmation
    AuthService.users_db.clear()
    return {"message": "All users deleted successfully"}

# Test endpoint
@router.get("/test-token")
async def test_token(current_user: Dict = Depends(get_current_user)):
    """Test if token authentication is working"""
    return {
        "message": "Token authentication working!",
        "user_id": current_user["user_id"],
        "email": current_user["email"]
    }