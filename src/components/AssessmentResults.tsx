'use client'

import { useState } from 'react'
import { 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  BookOpen,
  Award,
  RefreshCw,
  Download,
  User,
  Zap
} from 'lucide-react'

interface AssessmentData {
  targetJob: {
    title: string
    company?: string
    description: string
  }
  userProfile: {
    technical: string[]
    soft: string[]
    certifications: string[]
    experience: {
      years: number
      level: string
    }
  }
  scores: {
    overall: number
    technical: number
    soft: number
    experience: number
  }
  skillsAnalysis: {
    matched: {
      technical: string[]
      soft: string[]
    }
    missing: {
      technical: string[]
      soft: string[]
    }
  }
  recommendations: {
    readiness: string
    timeToReady: string
    priority: string[]
    learningPlan: Array<{
      skill: string
      timeframe: string
      priority: string
    }>
    interviewPrep: string[]
  }
}

interface AssessmentResultsProps {
  data: AssessmentData
  onReset: () => void
}

export default function AssessmentResults({ data, onReset }: AssessmentResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'plan' | 'interview'>('overview')

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getReadinessColor = (readiness: string) => {
    if (readiness === 'Ready') return 'bg-green-100 text-green-800 border-green-200'
    if (readiness === 'Nearly Ready') return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-red-100 text-red-800 border-red-200'
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'bg-red-100 text-red-800'
    if (priority === 'Medium') return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Assessment Results
              </span>
            </h1>
            <p className="text-gray-600 mt-1">
              Your personalized placement assessment for {data.targetJob.title}
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>New Assessment</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Overall Score Card */}
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Overall Readiness Score</h2>
                <p className="text-green-100">
                  {data.targetJob.title}
                  {data.targetJob.company && ` at ${data.targetJob.company}`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold mb-2">{data.scores.overall}%</div>
                <div className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium ${getReadinessColor(data.recommendations.readiness)}`}>
                  <Zap className="w-4 h-4 mr-2" />
                  {data.recommendations.readiness}
                </div>
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getScoreColor(data.scores.technical)}`}>
                <Target className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{data.scores.technical}%</div>
              <p className="text-sm text-gray-600">Technical Skills</p>
            </div>

            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getScoreColor(data.scores.soft)}`}>
                <User className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{data.scores.soft}%</div>
              <p className="text-sm text-gray-600">Soft Skills</p>
            </div>

            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getScoreColor(data.scores.experience)}`}>
                <Award className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{data.scores.experience}%</div>
              <p className="text-sm text-gray-600">Experience Match</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">{data.recommendations.timeToReady}</div>
              <p className="text-sm text-gray-600">Time to Ready</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
          <div className="flex border-b">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'skills', label: 'Skills Analysis', icon: Target },
              { id: 'plan', label: 'Learning Plan', icon: BookOpen },
              { id: 'interview', label: 'Interview Prep', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600 bg-green-50'
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
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">Strengths</h3>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• {data.skillsAnalysis.matched.technical.length} technical skills matched</li>
                      <li>• {data.skillsAnalysis.matched.soft.length} soft skills aligned</li>
                      <li>• {data.userProfile.certifications.length} relevant certifications</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center mb-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">Areas to Improve</h3>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• {data.skillsAnalysis.missing.technical.length} technical skills to learn</li>
                      <li>• {data.skillsAnalysis.missing.soft.length} soft skills to develop</li>
                      <li>• Interview preparation needed</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center mb-3">
                      <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">Next Steps</h3>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Focus on {data.recommendations.priority[0] || 'core skills'}</li>
                      <li>• Complete learning plan in {data.recommendations.timeToReady}</li>
                      <li>• Practice interview scenarios</li>
                    </ul>
                  </div>
                </div>

                {/* Readiness Timeline */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your Readiness Timeline</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    <div className="relative flex items-center mb-6">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Current State</div>
                        <div className="text-sm text-gray-600">{data.scores.overall}% match with target role</div>
                      </div>
                    </div>

                    {data.scores.overall < 70 && (
                      <div className="relative flex items-center mb-6">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Development Phase</div>
                          <div className="text-sm text-gray-600">Complete priority skills training</div>
                        </div>
                      </div>
                    )}

                    <div className="relative flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Interview Ready</div>
                        <div className="text-sm text-gray-600">Estimated in {data.recommendations.timeToReady}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-8">
                {/* Matched Skills */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-2" />
                    Skills You Have
                  </h3>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Technical Skills</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {data.skillsAnalysis.matched.technical.map((skill) => (
                        <div key={skill} className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Soft Skills</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {data.skillsAnalysis.matched.soft.map((skill) => (
                        <div key={skill} className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Missing Skills */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <XCircle className="w-6 h-6 text-red-600 mr-2" />
                    Skills to Develop
                  </h3>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Technical Skills Gap</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {data.skillsAnalysis.missing.technical.map((skill) => (
                        <div key={skill} className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                          <XCircle className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {data.skillsAnalysis.missing.soft.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Soft Skills to Develop</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {data.skillsAnalysis.missing.soft.map((skill) => (
                          <div key={skill} className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                            <XCircle className="w-4 h-4 text-red-600 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'plan' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Learning Plan</h3>
                  <p className="text-gray-600 mb-6">
                    Based on your skill gaps, here's a prioritized learning plan to get you interview-ready.
                  </p>
                  
                  <div className="space-y-4">
                    {data.recommendations.learningPlan.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:shadow-md transition">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                              <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">{item.skill}</h4>
                              <p className="text-sm text-gray-600 mb-2">Timeline: {item.timeframe}</p>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(item.priority)}`}>
                                  {item.priority} Priority
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                            <BookOpen className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Resources */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Resources</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Online Courses</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Coursera - Advanced Programming</li>
                        <li>• Udemy - System Design Masterclass</li>
                        <li>• Pluralsight - Cloud Architecture</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Practice Platforms</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• LeetCode - Algorithm Practice</li>
                        <li>• HackerRank - Coding Challenges</li>
                        <li>• System Design Primer - GitHub</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Interview Preparation Plan</h3>
                  
                  <div className="space-y-4">
                    {data.recommendations.interviewPrep.map((item, index) => (
                      <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interview Topics */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Interview Focus</h4>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-gray-900">Data Structures & Algorithms</h5>
                        <p className="text-sm text-gray-600">Arrays, linked lists, trees, graphs, sorting</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-gray-900">System Design</h5>
                        <p className="text-sm text-gray-600">Scalability, databases, caching, load balancing</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-gray-900">Coding Best Practices</h5>
                        <p className="text-sm text-gray-600">Clean code, testing, debugging, optimization</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Behavioral Interview Prep</h4>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-gray-900">STAR Method</h5>
                        <p className="text-sm text-gray-600">Situation, Task, Action, Result framework</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-gray-900">Leadership Examples</h5>
                        <p className="text-sm text-gray-600">Team collaboration, conflict resolution</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-gray-900">Problem-Solving Stories</h5>
                        <p className="text-sm text-gray-600">Challenges overcome, lessons learned</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}