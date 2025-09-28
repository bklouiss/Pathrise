# app/services/resume_parser_service.py
import re
import io
from typing import Dict, List, Optional
from fastapi import UploadFile
import PyPDF2
from docx import Document

class ResumeParserService:
    
    @staticmethod
    async def parse_resume(file: UploadFile) -> Dict:
        """Parse uploaded resume file and extract text"""
        try:
            content = await file.read()
            
            if file.filename.endswith('.pdf'):
                text = ResumeParserService._parse_pdf(content)
            elif file.filename.endswith('.docx'):
                text = ResumeParserService._parse_docx(content)
            elif file.filename.endswith('.txt'):
                text = content.decode('utf-8')
            else:
                raise ValueError("Unsupported file format. Use PDF, DOCX, or TXT")
            
            # Extract structured data
            parsed_data = ResumeParserService._extract_resume_data(text)
            parsed_data['raw_text'] = text
            parsed_data['filename'] = file.filename
            
            return parsed_data
            
        except Exception as e:
            return {"error": f"Failed to parse resume: {str(e)}"}
    
    @staticmethod
    def _parse_pdf(content: bytes) -> str:
        """Extract text from PDF"""
        text = ""
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text
    
    @staticmethod
    def _parse_docx(content: bytes) -> str:
        """Extract text from DOCX"""
        doc = Document(io.BytesIO(content))
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    
    @staticmethod
    def _extract_resume_data(text: str) -> Dict:
        """Extract structured data from resume text"""
        
        # Extract email
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, text)
        
        # Extract phone numbers
        phone_pattern = r'(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})'
        phones = re.findall(phone_pattern, text)
        
        # Extract common skills (CS/CSE focused)
        skills = ResumeParserService._extract_skills(text)
        
        # Extract education
        education = ResumeParserService._extract_education(text)
        
        # Extract work experience keywords
        experience = ResumeParserService._extract_experience(text)
        
        return {
            "contact": {
                "emails": emails,
                "phones": phones
            },
            "skills": skills,
            "education": education,
            "experience": experience,
            "text_length": len(text)
        }
    
    @staticmethod
    def _extract_skills(text: str) -> Dict[str, List[str]]:
        """Extract technical skills from resume"""
        text_lower = text.lower()
        
        # Programming Languages (Updated)
        programming_languages = [
            'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'c', 'go', 
            'rust', 'swift', 'kotlin', 'scala', 'ruby', 'php', 'sql', 'html', 
            'css', 'r', 'matlab', 'assembly', 'verilog', 'vhdl', 'systemverilog',
            'perl', 'bash', 'powershell', 'dart', 'lua'
        ]
        
        # Frameworks & Libraries (Updated with current market trends)
        frameworks = [
            'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask',
            'spring', 'tensorflow', 'pytorch', 'keras', 'pandas', 'numpy',
            'fastapi', 'next.js', 'svelte', 'bootstrap', 'tailwind', 'scikit-learn',
            'opencv', 'hugging face', 'langchain', 'streamlit', 'gradio',
            'react native', 'flutter', 'electron', 'ionic', 'xamarin'
        ]
        
        # Databases (Updated)
        databases = [
            'mysql', 'postgresql', 'mongodb', 'redis', 'sqlite', 'oracle',
            'cassandra', 'dynamodb', 'elasticsearch', 'neo4j', 'influxdb',
            'firebase', 'supabase', 'planetscale', 'cockroachdb'
        ]
        
        # Cloud & DevOps (Updated)
        cloud_devops = [
            'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins',
            'terraform', 'ansible', 'linux', 'git', 'github', 'gitlab',
            'ci/cd', 'devops', 'microservices', 'serverless', 'lambda',
            'vercel', 'netlify', 'heroku', 'digitalocean', 'cloudflare'
        ]
        
        # Hardware Engineering & EDA Tools (NEW CATEGORY)
        hardware_engineering = [
            'verilog', 'vhdl', 'systemverilog', 'vivado', 'quartus', 'modelsim',
            'cadence', 'synopsys', 'mentor graphics', 'altium designer', 'kicad',
            'fpga', 'asic', 'pcb design', 'schematic design', 'layout design',
            'xilinx', 'altera', 'intel fpga', 'amd', 'arm', 'risc-v',
            'embedded systems', 'microcontrollers', 'arduino', 'raspberry pi',
            'jtag', 'spi', 'i2c', 'uart', 'pcie', 'ddr', 'usb'
        ]
        
        # AI & Machine Learning (NEW CATEGORY)
        ai_ml = [
            'machine learning', 'deep learning', 'neural networks', 'nlp',
            'computer vision', 'reinforcement learning', 'llm', 'gpt',
            'chatgpt', 'openai', 'anthropic', 'claude', 'transformers',
            'bert', 'stable diffusion', 'generative ai', 'prompt engineering'
        ]
        
        # Development Tools (Updated)
        development_tools = [
            'visual studio code', 'intellij', 'eclipse', 'vim', 'emacs',
            'jupyter', 'postman', 'insomnia', 'figma', 'adobe', 'slack', 'jira',
            'confluence', 'notion', 'trello', 'asana', 'discord', 'teams'
        ]
        
        # Web Technologies (NEW CATEGORY)
        web_technologies = [
            'rest api', 'graphql', 'websockets', 'json', 'xml', 'oauth',
            'jwt', 'cors', 'https', 'cdn', 'progressive web app', 'pwa',
            'responsive design', 'accessibility', 'seo', 'performance optimization'
        ]
        
        # Soft Skills (NEW CATEGORY)
        soft_skills = [
            'leadership', 'teamwork', 'communication', 'problem solving',
            'agile', 'scrum', 'kanban', 'project management', 'mentoring',
            'collaboration', 'critical thinking', 'analytical', 'creative'
        ]
        
        # Certifications (NEW CATEGORY)
        certifications = [
            'aws certified', 'google cloud certified', 'azure certified',
            'comptia', 'cisco', 'pmp', 'scrum master', 'product owner',
            'security+', 'network+', 'cissp', 'ceh', 'oscp'
        ]
        
        # Emerging Technologies (NEW CATEGORY)
        emerging_tech = [
            'blockchain', 'cryptocurrency', 'nft', 'web3', 'defi',
            'quantum computing', 'iot', 'edge computing', 'ar', 'vr',
            'metaverse', '5g', 'cybersecurity', 'zero trust'
        ]
        
        found_skills = {
            "programming_languages": [skill for skill in programming_languages if skill in text_lower],
            "frameworks": [skill for skill in frameworks if skill in text_lower],
            "databases": [skill for skill in databases if skill in text_lower],
            "cloud_devops": [skill for skill in cloud_devops if skill in text_lower],
            "hardware_engineering": [skill for skill in hardware_engineering if skill in text_lower],
            "ai_ml": [skill for skill in ai_ml if skill in text_lower],
            "development_tools": [skill for skill in development_tools if skill in text_lower],
            "web_technologies": [skill for skill in web_technologies if skill in text_lower],
            "soft_skills": [skill for skill in soft_skills if skill in text_lower],
            "certifications": [skill for skill in certifications if skill in text_lower],
            "emerging_tech": [skill for skill in emerging_tech if skill in text_lower]
        }
        
        return found_skills
    
    @staticmethod
    def _extract_education(text: str) -> List[str]:
        """Extract education information"""
        education_keywords = [
            'bachelor', 'master', 'phd', 'degree', 'university', 'college',
            'computer science', 'computer engineering', 'software engineering',
            'data science', 'information technology', 'cybersecurity'
        ]
        
        found_education = []
        text_lower = text.lower()
        
        for keyword in education_keywords:
            if keyword in text_lower:
                found_education.append(keyword)
        
        return list(set(found_education))  # Remove duplicates
    
    @staticmethod
    def _extract_experience(text: str) -> Dict[str, List[str]]:
        """Extract work experience keywords"""
        text_lower = text.lower()
        
        experience_levels = ['intern', 'junior', 'senior', 'lead', 'manager', 'director']
        job_types = [
            'software engineer', 'developer', 'programmer', 'analyst',
            'data scientist', 'devops', 'full stack', 'frontend', 'backend',
            'mobile developer', 'web developer', 'qa', 'tester'
        ]
        
        found_experience = {
            "levels": [level for level in experience_levels if level in text_lower],
            "roles": [role for role in job_types if role in text_lower]
        }
        
        return found_experience