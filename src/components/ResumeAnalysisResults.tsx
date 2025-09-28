'use client'

import { useState } from 'react'
import { 
  FileText, 
  User, 
  Award, 
  TrendingUp, 
  Target, 
  BookOpen,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react'

interface ResumeAnalysisData {
  fileName: string
  detectedSkills: {
    technical: string[]
    soft: string[]
    certifications: string[]
  }
  experience: {
    totalYears: number
    level: string
    industries: string[]
  }
  recommendations: {
    skillsToImprove: string[]
    suggestedRoles: string[]
    learningPaths: string[]
  }
}

interface ResumeAnalysisResultsProps {
  data: ResumeAnalysisData
  onReset: () => void
}

export default function ResumeAnalysisResults({ data, onReset }: ResumeAnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<'skills' | 'experience' | 'recommendations'>('skills')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Resume Analysis Complete</h2>
                <p className="text-purple-100">{data.fileName}</p>
              </div>
            </div>
            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Analyze New Resume</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.detectedSkills.technical.length}</p>
            <p className="text-sm text-gray-600">Technical Skills</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.detectedSkills.soft.length}</p>
            <p className="text-sm text-gray-600">Soft Skills</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.detectedSkills.certifications.length}</p>
            <p className="text-sm text-gray-600">Certifications</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{data.experience.totalYears}+</p>
            <p className="text-sm text-gray-600">Years Experience</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
        <div className="flex border-b">
          {[
            { id: 'skills', label: 'Detected Skills', icon: Target },
            { id: 'experience', label: 'Experience Profile', icon: User },
            { id: 'recommendations', label: 'Recommendations', icon: BookOpen }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition flex items-center justify-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600 bg-purple-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'skills' && (
            <div className="space-y-8">
              {/* Technical Skills */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <Target className="w-4 h-4 text-purple-600" />
                  </div>
                  Technical Skills Detected
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {data.detectedSkills.technical.map((skill, index) => (
                    <div key={skill} className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  Soft Skills Detected
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {data.detectedSkills.soft.map((skill) => (
                    <div key={skill} className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  Certifications Found
                </h3>
                <div className="space-y-3">
                  {data.detectedSkills.certifications.map((cert) => (
                    <div key={cert} className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                      <Award className="w-5 h-5 text-green-600 mr-3" />
                      <span className="font-medium text-gray-900">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Experience Summary */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Experience Summary</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Experience Level</span>
                        <span className="text-lg font-bold text-gray-900">{data.experience.level}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Total Years</span>
                        <span className="text-lg font-bold text-gray-900">{data.experience.totalYears}+ years</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Industry Experience */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Experience</h3>
                  <div className="space-y-3">
                    {data.experience.industries.map((industry) => (
                      <div key={industry} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <span className="font-medium text-gray-900">{industry}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-8">
              {/* Skills to Improve */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
                  Skills to Develop
                </h3>
                <p className="text-gray-600 mb-4">
                  Based on current market trends, consider developing these skills to enhance your profile:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {data.recommendations.skillsToImprove.map((skill) => (
                    <div key={skill} className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <AlertTriangle className="w-4 h-4 text-orange-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-900">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Roles */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="w-6 h-6 text-purple-600 mr-3" />
                  Suggested Job Roles
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {data.recommendations.suggestedRoles.map((role) => (
                    <div key={role} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">{role}</h4>
                      <div className="flex items-center text-sm text-purple-600">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        <span>Good match</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Paths */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 text-green-600 mr-3" />
                  Recommended Learning Paths
                </h3>
                <div className="space-y-3">
                  {data.recommendations.learningPaths.map((path, index) => (
                    <div key={path} className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-green-600">{index + 1}</span>
                        </div>
                        <span className="font-medium text-gray-900">{path}</span>
                      </div>
                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}