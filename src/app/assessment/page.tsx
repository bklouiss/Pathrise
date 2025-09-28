'use client'

import { useState } from 'react'
import { ArrowLeft, Target, User, CheckCircle, XCircle, Clock, TrendingUp, AlertTriangle, Star } from 'lucide-react'
import Link from 'next/link'
import AssessmentResults from '@/components/AssessmentResults'

interface UserSkills {
  technical: string[]
  soft: string[]
  certifications: string[]
  experience: {
    years: number
    level: string
  }
}

interface TargetJob {
  title: string
  description: string
  company?: string
}

export default function PlacementAssessment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userSkills, setUserSkills] = useState<UserSkills>({
    technical: [],
    soft: [],
    certifications: [],
    experience: { years: 0, level: 'Entry' }
  })
  const [targetJob, setTargetJob] = useState<TargetJob>({
    title: '',
    description: '',
    company: ''
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [assessmentComplete, setAssessmentComplete] = useState(false)
  const [assessmentData, setAssessmentData] = useState(null)

  // Predefined skills for easy selection
  const commonTechnicalSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git',
    'TypeScript', 'Java', 'C++', 'Angular', 'Vue.js', 'MongoDB', 'PostgreSQL',
    'Kubernetes', 'Jenkins', 'GraphQL', 'REST APIs', 'Machine Learning'
  ]

  const commonSoftSkills = [
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management',
    'Critical Thinking', 'Adaptability', 'Project Management', 'Public Speaking',
    'Negotiation', 'Mentoring', 'Strategic Planning', 'Data Analysis', 'Customer Service'
  ]

  const commonCertifications = [
    'AWS Certified Solutions Architect', 'Google Cloud Professional', 'Microsoft Azure Fundamentals',
    'Certified Scrum Master', 'PMP Certification', 'Google Analytics', 'Salesforce Admin',
    'CompTIA Security+', 'Cisco CCNA', 'Oracle Certified Professional'
  ]

  const experienceLevels = ['Entry', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Principal']

  const handleSkillToggle = (skill: string, category: 'technical' | 'soft' | 'certifications') => {
    setUserSkills(prev => ({
      ...prev,
      [category]: prev[category].includes(skill)
        ? prev[category].filter(s => s !== skill)
        : [...prev[category], skill]
    }))
  }

  const runAssessment = async () => {
    setIsAnalyzing(true)
    
    // Simulate assessment analysis
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    // Generate mock assessment results
    const requiredSkills = {
      technical: ['JavaScript', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'TypeScript', 'GraphQL'],
      soft: ['Communication', 'Problem Solving', 'Teamwork', 'Leadership', 'Time Management']
    }
    
    const matchedTechnical = userSkills.technical.filter(skill => requiredSkills.technical.includes(skill))
    const matchedSoft = userSkills.soft.filter(skill => requiredSkills.soft.includes(skill))
    const missingTechnical = requiredSkills.technical.filter(skill => !userSkills.technical.includes(skill))
    const missingSoft = requiredSkills.soft.filter(skill => !userSkills.soft.includes(skill))
    
    const technicalScore = Math.round((matchedTechnical.length / requiredSkills.technical.length) * 100)
    const softScore = Math.round((matchedSoft.length / requiredSkills.soft.length) * 100)
    const overallScore = Math.round((technicalScore + softScore) / 2)
    
    const mockAssessment = {
      targetJob: targetJob,
      userProfile: userSkills,
      scores: {
        overall: overallScore,
        technical: technicalScore,
        soft: softScore,
        experience: Math.min(100, (userSkills.experience.years / 5) * 100)
      },
      skillsAnalysis: {
        matched: {
          technical: matchedTechnical,
          soft: matchedSoft
        },
        missing: {
          technical: missingTechnical,
          soft: missingSoft
        }
      },
      recommendations: {
        readiness: overallScore >= 70 ? 'Ready' : overallScore >= 50 ? 'Nearly Ready' : 'Needs Development',
        timeToReady: overallScore >= 70 ? '0-1 months' : overallScore >= 50 ? '2-4 months' : '6-12 months',
        priority: missingTechnical.slice(0, 3),
        learningPlan: [
          { skill: missingTechnical[0] || 'Advanced JavaScript', timeframe: '2-4 weeks', priority: 'High' },
          { skill: missingTechnical[1] || 'System Design', timeframe: '4-6 weeks', priority: 'Medium' },
          { skill: missingSoft[0] || 'Technical Communication', timeframe: '2-3 weeks', priority: 'Medium' }
        ].filter(item => item.skill),
        interviewPrep: [
          'Practice coding challenges on LeetCode',
          'Review system design concepts',
          'Prepare behavioral questions using STAR method',
          'Mock interviews with peers'
        ]
      }
    }
    
    setAssessmentData(mockAssessment)
    setIsAnalyzing(false)
    setAssessmentComplete(true)
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  if (assessmentComplete && assessmentData) {
    return <AssessmentResults data={assessmentData} onReset={() => {
      setAssessmentComplete(false)
      setCurrentStep(1)
      setAssessmentData(null)
    }} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Placement Assessment
              </span>
            </h1>
            <p className="text-gray-600 mt-1">
              Discover your readiness for your target role
            </p>
          </div>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-600">
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Technical Skills' :
                currentStep === 2 ? 'Soft Skills & Experience' :
                currentStep === 3 ? 'Target Job Details' :
                'Assessment Analysis'
              }
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg border p-8">
          {/* Step 1: Technical Skills */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Technical Skills</h2>
              <p className="text-gray-600 mb-6">
                Choose the technical skills you currently possess. Be honest - this helps create an accurate assessment.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {commonTechnicalSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill, 'technical')}
                    className={`p-3 rounded-lg border text-sm font-medium transition ${
                      userSkills.technical.includes(skill)
                        ? 'bg-green-100 border-green-300 text-green-800'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {commonCertifications.map((cert) => (
                    <button
                      key={cert}
                      onClick={() => handleSkillToggle(cert, 'certifications')}
                      className={`p-3 rounded-lg border text-sm text-left transition ${
                        userSkills.certifications.includes(cert)
                          ? 'bg-blue-100 border-blue-300 text-blue-800'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cert}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Soft Skills & Experience */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Soft Skills & Experience</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Your Soft Skills</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {commonSoftSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill, 'soft')}
                      className={`p-3 rounded-lg border text-sm font-medium transition ${
                        userSkills.soft.includes(skill)
                          ? 'bg-purple-100 border-purple-300 text-purple-800'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={userSkills.experience.years}
                    onChange={(e) => setUserSkills(prev => ({
                      ...prev,
                      experience: { ...prev.experience, years: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={userSkills.experience.level}
                    onChange={(e) => setUserSkills(prev => ({
                      ...prev,
                      experience: { ...prev.experience, level: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  >
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Target Job */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Target Job Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={targetJob.title}
                    onChange={(e) => setTargetJob(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={targetJob.company}
                    onChange={(e) => setTargetJob(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g., Google, Microsoft, Startup"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={targetJob.description}
                    onChange={(e) => setTargetJob(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Paste the job description here, or describe the role you're targeting..."
                    rows={8}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Analyze */}
          {currentStep === 4 && !isAnalyzing && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Analyze</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Your Profile Summary</h3>
                  <div className="text-sm text-gray-700">
                    <p><strong>Technical Skills:</strong> {userSkills.technical.length} selected</p>
                    <p><strong>Soft Skills:</strong> {userSkills.soft.length} selected</p>
                    <p><strong>Certifications:</strong> {userSkills.certifications.length} selected</p>
                    <p><strong>Experience:</strong> {userSkills.experience.years} years, {userSkills.experience.level} level</p>
                    <p><strong>Target Role:</strong> {targetJob.title}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">What We'll Analyze</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Skill match percentage with job requirements</li>
                    <li>• Experience level alignment</li>
                    <li>• Skill gaps and learning recommendations</li>
                    <li>• Interview readiness assessment</li>
                    <li>• Personalized development plan</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Analyzing State */}
          {isAnalyzing && (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Profile</h2>
              <div className="space-y-2 text-gray-600">
                <p>🔍 Comparing your skills with job requirements...</p>
                <p>📊 Calculating compatibility scores...</p>
                <p>🎯 Generating personalized recommendations...</p>
                <p>📋 Creating your development plan...</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {!isAnalyzing && (
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={runAssessment}
                  disabled={!targetJob.title || !targetJob.description}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Run Assessment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}