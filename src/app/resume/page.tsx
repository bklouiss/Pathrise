'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, Zap } from 'lucide-react'
import Link from 'next/link'
import ResumeAnalysisResults from '@/components/ResumeAnalysisResults'

export default function ResumeScanner() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, DOC, DOCX, or TXT file')
        return
      }
      
      // Validate file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }
      
      setFile(selectedFile)
      setError('')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      const input = document.createElement('input')
      input.type = 'file'
      input.files = e.dataTransfer.files
      handleFileChange({ target: input } as any)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const analyzeResume = async () => {
    if (!file) return

    setIsUploading(true)
    setError('')

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsUploading(false)
      setIsAnalyzing(true)

      // Simulate resume analysis
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Mock analysis results
      const mockAnalysis = {
        fileName: file.name,
        detectedSkills: {
          technical: [
            'JavaScript', 'React', 'Node.js', 'Python', 'SQL',
            'Git', 'Docker', 'AWS', 'MongoDB', 'Express.js'
          ],
          soft: [
            'Leadership', 'Communication', 'Problem Solving',
            'Project Management', 'Team Collaboration', 'Adaptability'
          ],
          certifications: [
            'AWS Certified Solutions Architect',
            'Google Analytics Certified',
            'Scrum Master Certification'
          ]
        },
        experience: {
          totalYears: Math.floor(Math.random() * 8) + 2,
          level: 'Senior',
          industries: ['Technology', 'E-commerce', 'SaaS']
        },
        recommendations: {
          skillsToImprove: ['TypeScript', 'GraphQL', 'Kubernetes', 'Machine Learning'],
          suggestedRoles: ['Senior Software Engineer', 'Full Stack Developer', 'Tech Lead'],
          learningPaths: [
            'Advanced React Patterns',
            'System Design',
            'Cloud Architecture'
          ]
        }
      }

      setAnalysisData(mockAnalysis)
      setIsAnalyzing(false)
      setAnalysisComplete(true)

    } catch (err) {
      setError('Failed to analyze resume. Please try again.')
      setIsUploading(false)
      setIsAnalyzing(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setAnalysisComplete(false)
    setAnalysisData(null)
    setError('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Search</span>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Resume Scanner
              </span>
            </h1>
            <p className="text-gray-600 mt-1">
              Discover your existing skills and get personalized recommendations
            </p>
          </div>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {!analysisComplete ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Unlock Your Skill Potential
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload your resume and let our AI analyze your existing skills, experience, and suggest areas for growth.
              </p>
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-lg border p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Upload Your Resume
              </h3>

              {/* Drag & Drop Area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-purple-300 rounded-lg p-12 text-center hover:border-purple-400 transition cursor-pointer"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <div className="space-y-4">
                  {file ? (
                    <>
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">{file.name}</p>
                        <p className="text-gray-600">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-16 h-16 text-purple-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          Drop your resume here or click to browse
                        </p>
                        <p className="text-gray-600 mt-2">
                          Supports PDF, DOC, DOCX, and TXT files (Max 10MB)
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <input
                id="file-input"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex justify-center space-x-4">
                {file && (
                  <>
                    <button
                      onClick={resetUpload}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Choose Different File
                    </button>
                    <button
                      onClick={analyzeResume}
                      disabled={isUploading || isAnalyzing}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isUploading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Uploading...</span>
                        </>
                      ) : isAnalyzing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing Resume...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-5 h-5" />
                          <span>Analyze Resume</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Extraction</h3>
                <p className="text-gray-600 text-sm">
                  AI-powered skill detection from your resume content
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Gap Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Compare your skills against market demands
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Personalized Path</h3>
                <p className="text-gray-600 text-sm">
                  Get tailored recommendations for skill development
                </p>
              </div>
            </div>
          </div>
        ) : (
          <ResumeAnalysisResults data={analysisData} onReset={resetUpload} />
        )}
      </div>
    </main>
  )
}