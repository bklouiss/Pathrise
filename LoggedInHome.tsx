'use client'

import { useState } from 'react'
import JobSearchForm from '@/components/JobSearchForm'
import { Search, Target, BookOpen, Upload, BarChart3, Clock, TrendingUp, ChevronRight, Bell, User, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

interface LoggedInHomeProps {
  user: {
    name: string
    email: string
    recentSearches: number
    skillsTracked: number
    coursesInProgress: number
  }
}

export default function LoggedInHome({ user }: LoggedInHomeProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pathrise
              </span>
            </h1>
            <p className="text-gray-600 mt-1">
              Your personalized career development platform
            </p>
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Continue building your skills and advancing your career.
          </p>
        </div>

        {/* Dashboard Widget */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
            {/* Widget Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Your Progress Overview</h3>
                  <p className="text-purple-100 mt-1">Track your journey and stay motivated</p>
                </div>
                <Link 
                  href="/dashboard"
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white font-medium transition flex items-center space-x-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Full Dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{user.recentSearches}</p>
                <p className="text-sm text-gray-600">Recent Searches</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{user.skillsTracked}</p>
                <p className="text-sm text-gray-600">Skills Tracked</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{user.coursesInProgress}</p>
                <p className="text-sm text-gray-600">Courses Active</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <Search className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Software Engineer search</p>
                      <p className="text-sm text-gray-600">San Francisco, CA • 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+15% growth</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">React Course Progress</p>
                      <p className="text-sm text-gray-600">65% complete • Next: Redux Module</p>
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-3/5 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Resume Analysis Complete</p>
                      <p className="text-sm text-gray-600">4 skill gaps identified • 1 week ago</p>
                    </div>
                  </div>
                  <Link href="/resume" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                    View Report
                  </Link>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t">
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    href="/dashboard"
                    className="flex items-center justify-center space-x-2 py-2 px-4 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition text-sm font-medium"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>View Analytics</span>
                  </Link>
                  <Link 
                    href="/resume"
                    className="flex items-center justify-center space-x-2 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Analyze Resume</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Search Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Search New Opportunities
            </h3>
            <p className="text-lg text-gray-600">
              Discover what skills are trending in your field
            </p>
          </div>
          <JobSearchForm />
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Resume Analysis</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Upload a new resume or update your existing analysis
                </p>
                <Link 
                  href="/resume"
                  className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white font-medium transition"
                >
                  <Upload className="w-4 h-4" />
                  <span>Analyze Resume</span>
                </Link>
              </div>
              <Upload className="w-16 h-16 text-blue-200" />
            </div>
          </div>

          <div className="bg-white border-2 border-green-200 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Learning Hub</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Continue your courses and discover new learning resources
                </p>
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-medium transition"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View Courses</span>
                </Link>
              </div>
              <BookOpen className="w-16 h-16 text-green-300" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}