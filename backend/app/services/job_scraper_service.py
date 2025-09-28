# app/services/job_scraper_service.py
import requests
import re
from typing import Dict, List, Optional
import asyncio
import aiohttp

class JobScraperService:
    
    @staticmethod
    async def search_jobs(job_title: str, location: str = "United States", limit: int = 10) -> Dict:
        """Search for jobs and extract requirements"""
        try:
            # Use multiple job APIs for better coverage
            results = await JobScraperService._search_multiple_sources(job_title, location, limit)
            
            # Extract skills from all job descriptions
            all_skills = []
            job_summaries = []
            
            for job in results:
                extracted_skills = JobScraperService._extract_job_requirements(job.get('description', ''))
                all_skills.extend(extracted_skills)
                
                job_summaries.append({
                    'title': job.get('title', ''),
                    'company': job.get('company', ''),
                    'location': job.get('location', ''),
                    'skills_required': extracted_skills,
                    'url': job.get('url', ''),
                    'salary': job.get('salary', '')
                })
            
            # Aggregate skills and count frequency
            skill_frequency = JobScraperService._count_skill_frequency(all_skills)
            
            return {
                'search_query': f"{job_title} in {location}",
                'jobs_found': len(job_summaries),
                'job_summaries': job_summaries,
                'top_skills_required': skill_frequency,
                'total_skills_mentioned': len(all_skills)
            }
            
        except Exception as e:
            return {"error": f"Failed to scrape jobs: {str(e)}"}
    
    @staticmethod
    async def _search_multiple_sources(job_title: str, location: str, limit: int) -> List[Dict]:
        """Search multiple job sources (simplified for hackathon)"""
        jobs = []
        
        # For hackathon speed, we'll create mock data that represents real job requirements
        # In production, you'd use actual APIs like Indeed, LinkedIn, etc.
        
        mock_jobs = JobScraperService._generate_realistic_job_data(job_title, location, limit)
        jobs.extend(mock_jobs)
        
        return jobs[:limit]
    
    @staticmethod
    def _generate_realistic_job_data(job_title: str, location: str, limit: int) -> List[Dict]:
        """Generate realistic job data for CS/CSE roles"""
        
        job_templates = {
            'software engineer': [
                {
                    'title': 'Software Engineer',
                    'company': 'Tech Corp',
                    'location': location,
                    'description': 'We are looking for a software engineer with experience in Python, JavaScript, React, Node.js, AWS, Docker, and SQL. Must have experience with agile development, Git, and RESTful APIs. Bachelor\'s degree in Computer Science required.',
                    'salary': '$80,000 - $120,000',
                    'url': 'https://example.com/job1'
                },
                {
                    'title': 'Full Stack Developer',
                    'company': 'StartupXYZ',
                    'location': location,
                    'description': 'Full stack developer needed with React, Angular, Node.js, MongoDB, PostgreSQL, and cloud experience (AWS/Azure). Experience with TypeScript, Docker, Kubernetes, and CI/CD pipelines preferred.',
                    'salary': '$70,000 - $110,000',
                    'url': 'https://example.com/job2'
                },
                {
                    'title': 'Backend Engineer',
                    'company': 'DataFlow Inc',
                    'location': location,
                    'description': 'Backend engineer with Python, Django, FastAPI, PostgreSQL, Redis, and microservices architecture. Experience with Kafka, Docker, Kubernetes, and monitoring tools required.',
                    'salary': '$90,000 - $130,000',
                    'url': 'https://example.com/job3'
                }
            ],
            'data scientist': [
                {
                    'title': 'Data Scientist',
                    'company': 'AI Analytics Co',
                    'location': location,
                    'description': 'Data scientist role requiring Python, R, SQL, TensorFlow, PyTorch, scikit-learn, pandas, and numpy. Experience with machine learning, deep learning, and statistical analysis. PhD preferred.',
                    'salary': '$100,000 - $150,000',
                    'url': 'https://example.com/job4'
                },
                {
                    'title': 'ML Engineer',
                    'company': 'MLOps Solutions',
                    'location': location,
                    'description': 'Machine learning engineer with Python, TensorFlow, PyTorch, Kubernetes, Docker, and MLOps experience. Knowledge of NLP, computer vision, and model deployment required.',
                    'salary': '$110,000 - $160,000',
                    'url': 'https://example.com/job5'
                }
            ],
            'hardware engineer': [
                {
                    'title': 'Hardware Engineer',
                    'company': 'ChipDesign Corp',
                    'location': location,
                    'description': 'Hardware engineer with Verilog, VHDL, SystemVerilog, and Vivado experience. FPGA development, ASIC design, and PCB layout skills required. Experience with Cadence, Synopsys tools preferred.',
                    'salary': '$85,000 - $125,000',
                    'url': 'https://example.com/job6'
                },
                {
                    'title': 'FPGA Engineer',
                    'company': 'Embedded Systems Ltd',
                    'location': location,
                    'description': 'FPGA engineer with Xilinx Vivado, Altera Quartus, Verilog, and embedded systems experience. Knowledge of ARM, RISC-V, and communication protocols (SPI, I2C, UART) required.',
                    'salary': '$90,000 - $135,000',
                    'url': 'https://example.com/job7'
                }
            ]
        }
        
        # Match job title to appropriate templates
        title_lower = job_title.lower()
        if 'data scientist' in title_lower or 'ml' in title_lower or 'machine learning' in title_lower:
            selected_jobs = job_templates.get('data scientist', [])
        elif 'hardware' in title_lower or 'fpga' in title_lower or 'embedded' in title_lower:
            selected_jobs = job_templates.get('hardware engineer', [])
        else:
            selected_jobs = job_templates.get('software engineer', [])
        
        # Extend with additional variations if needed
        while len(selected_jobs) < limit:
            selected_jobs.extend(job_templates['software engineer'])
        
        return selected_jobs[:limit]
    
    @staticmethod
    def _extract_job_requirements(description: str) -> List[str]:
        """Extract technical skills from job description"""
        description_lower = description.lower()
        
        # Use the same skill categories as resume parser for consistency
        all_skills = [
            # Programming Languages
            'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'c', 'go', 
            'rust', 'swift', 'kotlin', 'scala', 'ruby', 'php', 'sql', 'html', 
            'css', 'r', 'matlab', 'verilog', 'vhdl', 'systemverilog',
            
            # Frameworks & Libraries
            'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask',
            'spring', 'tensorflow', 'pytorch', 'keras', 'pandas', 'numpy',
            'fastapi', 'next.js', 'svelte', 'bootstrap', 'tailwind', 'scikit-learn',
            
            # Databases
            'mysql', 'postgresql', 'mongodb', 'redis', 'sqlite', 'oracle',
            'cassandra', 'dynamodb', 'elasticsearch',
            
            # Cloud & DevOps
            'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins',
            'terraform', 'ansible', 'linux', 'git', 'github', 'gitlab',
            'ci/cd', 'microservices', 'serverless',
            
            # Hardware Engineering
            'vivado', 'quartus', 'modelsim', 'cadence', 'synopsys',
            'fpga', 'asic', 'pcb design', 'xilinx', 'altera', 'embedded systems',
            
            # AI/ML
            'machine learning', 'deep learning', 'neural networks', 'nlp',
            'computer vision', 'artificial intelligence',
            
            # Web Technologies
            'rest api', 'graphql', 'websockets', 'json', 'oauth', 'jwt',
            
            # Soft Skills
            'agile', 'scrum', 'kanban', 'leadership', 'teamwork', 'communication'
        ]
        
        found_skills = []
        for skill in all_skills:
            if skill in description_lower:
                found_skills.append(skill)
        
        return found_skills
    
    @staticmethod
    def _count_skill_frequency(skills: List[str]) -> Dict[str, int]:
        """Count how often each skill appears across job postings"""
        frequency = {}
        for skill in skills:
            frequency[skill] = frequency.get(skill, 0) + 1
        
        # Sort by frequency (most common first)
        sorted_skills = dict(sorted(frequency.items(), key=lambda x: x[1], reverse=True))
        return sorted_skills
    
    @staticmethod
    def get_skills_gap_analysis(user_skills: Dict, job_requirements: Dict) -> Dict:
        """Compare user skills against job market requirements"""
        
        # Flatten user skills from resume
        user_skill_list = []
        for category, skills in user_skills.items():
            user_skill_list.extend(skills)
        
        # Get required skills from job market
        required_skills = set(job_requirements.keys())
        user_skills_set = set(skill.lower() for skill in user_skill_list)
        
        # Calculate gaps
        missing_skills = required_skills - user_skills_set
        matching_skills = required_skills & user_skills_set
        
        # Prioritize missing skills by frequency
        prioritized_gaps = []
        for skill in missing_skills:
            frequency = job_requirements.get(skill, 0)
            prioritized_gaps.append({
                'skill': skill,
                'frequency': frequency,
                'priority': 'High' if frequency >= 5 else 'Medium' if frequency >= 3 else 'Low'
            })
        
        # Sort by frequency
        prioritized_gaps.sort(key=lambda x: x['frequency'], reverse=True)
        
        return {
            'total_skills_required': len(required_skills),
            'skills_you_have': len(matching_skills),
            'skills_missing': len(missing_skills),
            'match_percentage': round((len(matching_skills) / len(required_skills)) * 100, 1) if required_skills else 0,
            'matching_skills': list(matching_skills),
            'missing_skills': prioritized_gaps[:10],  # Top 10 gaps
            'skill_categories_to_focus': JobScraperService._categorize_missing_skills(prioritized_gaps[:10])
        }
    
    @staticmethod
    def _categorize_missing_skills(missing_skills: List[Dict]) -> Dict[str, List[str]]:
        """Categorize missing skills for focused learning"""
        categories = {
            'Programming Languages': [],
            'Frameworks & Tools': [],
            'Cloud & DevOps': [],
            'Databases': [],
            'Soft Skills': []
        }
        
        for skill_info in missing_skills:
            skill = skill_info['skill']
            
            if skill in ['python', 'java', 'javascript', 'typescript', 'c++', 'go', 'rust']:
                categories['Programming Languages'].append(skill)
            elif skill in ['aws', 'azure', 'docker', 'kubernetes', 'terraform']:
                categories['Cloud & DevOps'].append(skill)
            elif skill in ['mysql', 'postgresql', 'mongodb', 'redis']:
                categories['Databases'].append(skill)
            elif skill in ['agile', 'scrum', 'leadership', 'communication']:
                categories['Soft Skills'].append(skill)
            else:
                categories['Frameworks & Tools'].append(skill)
        
        # Remove empty categories
        return {k: v for k, v in categories.items() if v}

    @staticmethod
    def _generate_learning_recommendations(missing_skills: List[Dict]) -> List[str]:
        """Generate learning recommendations based on missing skills"""
        recommendations = []
        for skill_info in missing_skills:
            skill = skill_info['skill']
            if skill in ['python', 'java', 'javascript']:
                recommendations.append(f"Learn {skill}: Start with Codecademy or FreeCodeCamp")
            elif skill in ['aws', 'azure', 'docker']:
                recommendations.append(f"Get {skill} certified: Official documentation and hands-on labs")
            elif skill in ['react', 'angular', 'vue']:
                recommendations.append(f"Build projects with {skill}: Create portfolio projects")
            else:
                recommendations.append(f"Study {skill}: Find online courses and practice projects")
        return recommendations[:5]
    
    @staticmethod
    def _identify_emerging_trends(skills: Dict[str, int]) -> List[str]:
        """Identify emerging technology trends"""
        emerging = []
        for skill, frequency in skills.items():
            if skill in ['kubernetes', 'terraform', 'machine learning', 'ai', 'blockchain']:
                emerging.append(skill)
        return emerging[:3]
    
    @staticmethod
    def _categorize_skills(skills: List[str]) -> Dict[str, List[str]]:
        """Categorize skills for better understanding"""
        categories = {
            'Programming': [],
            'Cloud/DevOps': [],
            'Frameworks': [],
            'Databases': []
        }
        
        for skill in skills:
            if skill in ['python', 'java', 'javascript', 'typescript']:
                categories['Programming'].append(skill)
            elif skill in ['aws', 'azure', 'docker', 'kubernetes']:
                categories['Cloud/DevOps'].append(skill)
            elif skill in ['react', 'angular', 'django', 'flask']:
                categories['Frameworks'].append(skill)
            elif skill in ['postgresql', 'mongodb', 'mysql']:
                categories['Databases'].append(skill)
        
        return {k: v for k, v in categories.items() if v}