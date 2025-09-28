'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Upload, 
  TrendingUp, 
  BookOpen, 
  Target, 
  User, 
  Settings, 
  Bell, 
  LogOut,
  Plus,
  Clock,
  Award,
  BarChart3,
  FileText,
  ExternalLink,
  ChevronRight,
  Star,
  Calendar,
  MapPin
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalSearches: number
  skillsTracked: number
  coursesStarted: number
  resumesAnalyzed: number
}

interface RecentSearch {
  id: string
  jobTitle: string
  location: string
  date: string
  topSkills: string[]
}

interface LearningProgress {
  skillName: string
  progress: number
  courseName: string
  provider: string
  nextMilestone: string
}

interface RecommendedCourse {
  id: string
  title: string
  provider: string
  rating: number
  students: string
  duration: string
  price: string
  skill: string
}

export default function Dashboard() {
  const [user] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: '/api/placeholder/40/40',
    memberSince: 'March 2024'
  })

  const [stats] = useState<DashboardStats>({
    totalSearches: 12,
    skillsTracked: 8,
    coursesStarted: 3,
    resumesAnalyzed: 2
  })

  const [recentSearches] = useState<RecentSearch[]>([
    {
      id: '1',
      jobTitle: 'Software Engineer',
      location: 'San Francisco, CA',
      date: '2 days ago',
      topSkills: ['JavaScript', 'React', 'Node.js']
    },
    {
      id: '2',
      jobTitle: 'Data Scientist',
      location: 'Remote',
      date: '1 week ago',
      topSkills: ['Python', 'Machine Learning', 'SQL']
    },
    {
      id: '3',
      jobTitle: 'Product Manager',
      location: 'New York, NY',
      date: '2 weeks ago',
      topSkills: ['Strategy', 'Analytics', 'Leadership']
    }
  ])

  const [learningProgress] = useState<LearningProgress[]>([
    {
      skillName: 'React',
      progress: 65,
      courseName: 'Complete React Course',
      provider: 'Udemy',
      nextMilestone: 'Redux Module'
    },
    {
      skillName: 'Python',
      progress: 30,
      courseName: 'Python Bootcamp',
      provider: 'Coursera',
      nextMilestone: 'Data Structures'
    },
    {
      skillName: 'AWS',
      progress: 85,
      courseName: 'AWS Solutions Architect',
      provider: 'A Cloud Guru',
      nextMilestone: 'Practice Exam'
    }
  ])

  const [recommendedCourses] = useState<RecommendedCourse[]>([
    {
      id: '1',
      title: 'Advanced JavaScript Concepts',
      provider: 'Udemy',
      rating: 4.8,
      students: '125k',
      duration: '32 hours',
      price: '$89.99',
      skill: 'JavaScript'
    },
    {
      id: '2',
      title: 'Docker & Kubernetes Complete Guide',
      provider: 'Pluralsight',
      rating: 4.7,
      students: '89k',
      duration: '28 hours',
      price: '$29/month',
      skill: 'DevOps'
    }
  ])

  const [activeTab, setActiveTab] = useState<'overview' | 'searches' | 'learning' | 'recommendations'>('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Pathrise
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`text-sm font-medium transition ${
                  activeTab === 'overview' 
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-2' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('searches')}
                className={`text-sm font-medium transition ${
                  activeTab === 'searches' 
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-2' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                My Searches
              </button>
              <button
                onClick={() => setActiveTab('learning')}
                className={`text-sm font-medium transition ${
                  activeTab === 'learning' 
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-2' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Learning
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`text-sm font-medium transition ${
                  activeTab === 'recommendations' 
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-2' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Recommendations
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">
            Track your progress and discover new opportunities to advance your career.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link 
            href="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Search Job Skills</h3>
                <p className="text-blue-100 text-sm">
                  Analyze market demands for any job title
                </p>
              </div>
              <Search className="w-8 h-8 text-blue-200 group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          <Link 
            href="/resume"
            className="bg-white border-2 border-purple-200 p-6 rounded-xl shadow-lg hover:border-purple-300 transition group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyze Resume</h3>
                <p className="text-gray-600 text-sm">
                  Get personalized skill recommendations
                </p>
              </div>
              <Upload className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSearches}</p>
                <p className="text-sm text-gray-600">Job Searches</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.skillsTracked}</p>
                <p className="text-sm text-gray-600">Skills Tracked</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.coursesStarted}</p>
                <p className="text-sm text-gray-600">Courses Started</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.resumesAnalyzed}</p>
                <p className="text-sm text-gray-600">Resumes Analyzed</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Searches */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Job Searches</h2>
                <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  New Search
                </Link>
              </div>

              <div className="space-y-4">
                {recentSearches.map((search) => (
                  <div key={search.id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{search.jobTitle}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{search.location}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{search.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {search.topSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Learning Progress</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {learningProgress.map((progress) => (
                  <div key={progress.skillName} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{progress.skillName}</h3>
                        <p className="text-sm text-gray-600">
                          {progress.courseName} • {progress.provider}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {progress.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Next: {progress.nextMilestone}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recommendations */}
          <div className="space-y-6">
            {/* Skill Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Trending Skills</h2>
              <div className="space-y-3">
                {['TypeScript', 'Docker', 'GraphQL', 'Kubernetes'].map((skill, index) => (
                  <div key={skill} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                      <span className="font-medium text-gray-900">{skill}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>+{15 + index * 3}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Courses</h2>
              <div className="space-y-4">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight">
                        {course.title}
                      </h3>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{course.provider}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" />
                          <span>{course.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{course.students}</span>
                      </div>
                      <span className="font-medium text-gray-900">{course.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Your Journey</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-purple-100">Member since</span>
                  <span className="font-medium">{user.memberSince}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-100">Skills analyzed</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-100">Hours learning</span>
                  <span className="font-medium">124</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}