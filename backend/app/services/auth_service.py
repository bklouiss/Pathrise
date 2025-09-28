# app/services/auth_service.py
import hashlib
import secrets
from typing import Dict, Optional
from datetime import datetime, timedelta
import jwt
from app.config import settings

class AuthService:
    # Simple in-memory storage for hackathon (use database in production)
    users_db = {}
    sessions_db = {}
    
    # JWT settings
    SECRET_KEY = "hackathon-secret-key-change-in-production"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_HOURS = 24
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash password with salt"""
        salt = secrets.token_hex(16)
        password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        return f"{salt}:{password_hash}"
    
    @staticmethod
    def verify_password(password: str, hashed: str) -> bool:
        """Verify password against hash"""
        try:
            salt, stored_hash = hashed.split(':')
            password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
            return password_hash == stored_hash
        except:
            return False
    
    @staticmethod
    def create_access_token(user_id: str) -> str:
        """Create JWT access token"""
        expires = datetime.utcnow() + timedelta(hours=AuthService.ACCESS_TOKEN_EXPIRE_HOURS)
        payload = {
            "user_id": user_id,
            "exp": expires,
            "iat": datetime.utcnow()
        }
        return jwt.encode(payload, AuthService.SECRET_KEY, algorithm=AuthService.ALGORITHM)
    
    @staticmethod
    def verify_access_token(token: str) -> Optional[str]:
        """Verify JWT token and return user_id"""
        try:
            payload = jwt.decode(token, AuthService.SECRET_KEY, algorithms=[AuthService.ALGORITHM])
            user_id = payload.get("user_id")
            return user_id if user_id else None
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    @staticmethod
    def register_user(email: str, password: str, full_name: str = "") -> Dict:
        """Register a new user"""
        # Check if user already exists
        if email in AuthService.users_db:
            return {"error": "User with this email already exists"}
        
        # Validate email format (basic)
        if "@" not in email or "." not in email:
            return {"error": "Invalid email format"}
        
        # Validate password length
        if len(password) < 6:
            return {"error": "Password must be at least 6 characters"}
        
        # Create user
        user_id = f"user_{len(AuthService.users_db) + 1}"
        hashed_password = AuthService.hash_password(password)
        
        user_data = {
            "user_id": user_id,
            "email": email,
            "full_name": full_name,
            "password_hash": hashed_password,
            "created_at": datetime.utcnow().isoformat(),
            "profile": {
                "resume_data": {},
                "skills_gap_history": [],
                "target_jobs": [],
                "learning_progress": {}
            }
        }
        
        # Store user
        AuthService.users_db[email] = user_data
        
        # Create access token
        access_token = AuthService.create_access_token(user_id)
        
        return {
            "message": "User registered successfully",
            "user": {
                "user_id": user_id,
                "email": email,
                "full_name": full_name,
                "created_at": user_data["created_at"]
            },
            "access_token": access_token,
            "token_type": "bearer"
        }
    
    @staticmethod
    def login_user(email: str, password: str) -> Dict:
        """Authenticate user and return token"""
        # Check if user exists
        if email not in AuthService.users_db:
            return {"error": "Invalid email or password"}
        
        user_data = AuthService.users_db[email]
        
        # Verify password
        if not AuthService.verify_password(password, user_data["password_hash"]):
            return {"error": "Invalid email or password"}
        
        # Create access token
        access_token = AuthService.create_access_token(user_data["user_id"])
        
        return {
            "message": "Login successful",
            "user": {
                "user_id": user_data["user_id"],
                "email": user_data["email"],
                "full_name": user_data["full_name"]
            },
            "access_token": access_token,
            "token_type": "bearer"
        }
    
    @staticmethod
    def get_user_by_id(user_id: str) -> Optional[Dict]:
        """Get user data by user_id"""
        for email, user_data in AuthService.users_db.items():
            if user_data["user_id"] == user_id:
                # Return user data without password hash
                return {
                    "user_id": user_data["user_id"],
                    "email": user_data["email"],
                    "full_name": user_data["full_name"],
                    "created_at": user_data["created_at"],
                    "profile": user_data["profile"]
                }
        return None
    
    @staticmethod
    def update_user_profile(user_id: str, profile_updates: Dict) -> Dict:
        """Update user profile data"""
        user_data = None
        user_email = None
        
        # Find user
        for email, data in AuthService.users_db.items():
            if data["user_id"] == user_id:
                user_data = data
                user_email = email
                break
        
        if not user_data:
            return {"error": "User not found"}
        
        # Update profile
        for key, value in profile_updates.items():
            if key in ["resume_data", "skills_gap_history", "target_jobs", "learning_progress"]:
                user_data["profile"][key] = value
        
        # Update in database
        AuthService.users_db[user_email] = user_data
        
        return {
            "message": "Profile updated successfully",
            "profile": user_data["profile"]
        }
    
    @staticmethod
    def add_skills_gap_analysis(user_id: str, analysis_data: Dict) -> Dict:
        """Add skills gap analysis to user history"""
        user_data = None
        user_email = None
        
        # Find user
        for email, data in AuthService.users_db.items():
            if data["user_id"] == user_id:
                user_data = data
                user_email = email
                break
        
        if not user_data:
            return {"error": "User not found"}
        
        # Add timestamp and store analysis
        analysis_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "job_title": analysis_data.get("job_title", ""),
            "match_percentage": analysis_data.get("match_percentage", 0),
            "missing_skills": analysis_data.get("missing_skills", []),
            "analysis": analysis_data
        }
        
        user_data["profile"]["skills_gap_history"].append(analysis_entry)
        
        # Keep only last 10 analyses
        if len(user_data["profile"]["skills_gap_history"]) > 10:
            user_data["profile"]["skills_gap_history"] = user_data["profile"]["skills_gap_history"][-10:]
        
        # Update in database
        AuthService.users_db[user_email] = user_data
        
        return {
            "message": "Skills gap analysis saved",
            "analysis_count": len(user_data["profile"]["skills_gap_history"])
        }
    
    @staticmethod
    def get_all_users() -> Dict:
        """Get all users (for admin/debug purposes)"""
        users = []
        for email, user_data in AuthService.users_db.items():
            users.append({
                "user_id": user_data["user_id"],
                "email": user_data["email"],
                "full_name": user_data["full_name"],
                "created_at": user_data["created_at"]
            })
        
        return {
            "total_users": len(users),
            "users": users
        }