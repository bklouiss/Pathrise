'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users,
  Code,
  MessageCircle,
  ExternalLink,
  Book,
  Play,
  Award
} from 'lucide-react'

interface AnalysisData {
  jobTitle: string
  location: string
  totalJobs: number
  skills: {
    technical: string[]
    soft: string[]
  }
  salaryRange: {
    min: number
    max: number
  }
  experience: string
  growth: string
}

interface SkillAnalysisProps {
  data: AnalysisData
}

export default function SkillAnalysis({ data }: SkillAnalysisProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'soft' | 'resources'>('overview')

  // Mock learning resources - in real app, these would be fetched based on skills
  const mockResources = {
    technical: [
      {
        title: 'Complete JavaScript Course',
        provider: 'Udemy',
        type: 'Course',
        rating: 4.8,
        students: '156k',
        url: '#'
      },
      {
        title: 'React Documentation',
        provider: 'React.dev',
        type: 'Documentation',
        rating: 4.9,
        students: 'Official',
        url: '#'
      },
      {
        title: 'Node.js Tutorial',
        provider: 'freeCodeCamp',
        type: 'Tutorial',
        rating: 4.7,
        students: '89k',
        url: '#'
      }
    ],
    soft: [
      {
        title: 'Effective Communication',
        provider: 'Coursera',
        type: 'Course',
        rating: 4.6,
        students: '234k',
        url: '#'
      },
      {
        title: 'Problem-Solving Techniques',
        provider: 'LinkedIn Learning',
        type: 'Course',
        rating: 4.5,
        students: '78k',
        url: '#'
      }
    ]
  }

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getResourceIcon = (type: string, skillType: 'technical' | 'soft' = 'technical') => {
    const iconColor = skillType === 'technical' ? 'text-blue-600' : 'text-purple-600'
    
    switch (type) {
      case 'Course': return <Book className={`w-4 h-4 ${iconColor}`} />
      case 'Tutorial': return <Play className={`w-4 h-4 ${iconColor}`} />
      case 'Documentation': return <ExternalLink className={`w-4 h-4 ${iconColor}`} />
      default: return <Book className={`w-4 h-4 ${iconColor}`} />
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">
          Analysis for {data.jobTitle}
        </h2>
        {data.location && (
          <p className="text-blue-100">📍 {data.location}</p>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{data.totalJobs.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Open Positions</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">
            {formatSalary(data.salaryRange.min)} - {formatSalary(data.salaryRange.max)}
          </p>
          <p className="text-sm text-gray-600">Salary Range</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">{data.experience}</p>
          <p className="text-sm text-gray-600">Experience</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">{data.growth}</p>
          <p className="text-sm text-gray-600">Growth Rate</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'technical', label: 'Technical Skills' },
          { id: 'soft', label: 'Soft Skills' },
          { id: 'resources', label: 'Learning Resources' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900">
                <Code className="w-5 h-5 mr-2 text-blue-600" />
                Top Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.technical.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900">
                <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
                Essential Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.soft.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Technical Skills Required</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {data.skills.technical.map((skill, index) => (
                <div
                  key={skill}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{skill}</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {Math.floor(Math.random() * 40) + 60}% of jobs require this
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'soft' && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Soft Skills Required</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.soft.map((skill, index) => (
                <div
                  key={skill}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{skill}</span>
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-800">
                    Critical for {Math.floor(Math.random() * 30) + 70}% of positions
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Technical Skills Resources</h3>
              <div className="space-y-3">
                {mockResources.technical.map((resource, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getResourceIcon(resource.type, 'technical')}
                          <h4 className="font-medium text-gray-900">{resource.title}</h4>
                        </div>
                        <p className="text-sm text-gray-800 mb-2">{resource.provider}</p>
                                                  <div className="flex items-center space-x-4 text-sm text-gray-700">
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4" />
                            <span>{resource.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{resource.students} students</span>
                          </div>
                        </div>
                      </div>
                      <button className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Soft Skills Resources</h3>
              <div className="space-y-3">
                {mockResources.soft.map((resource, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getResourceIcon(resource.type, 'soft')}
                          <h4 className="font-medium text-gray-900">{resource.title}</h4>
                        </div>
                        <p className="text-sm text-gray-800 mb-2">{resource.provider}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-700">
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4" />
                            <span>{resource.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{resource.students} students</span>
                          </div>
                        </div>
                      </div>
                      <button className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}