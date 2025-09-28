'use client'

import { useState, useEffect } from 'react'
import LoggedInHome from '@/components/LoggedInHome'
import NonLoggedInHome from '@/components/NonLoggedInHome'

export default function Home() {
  // Mock authentication state - replace with real auth logic
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [user] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    recentSearches: 5,
    skillsTracked: 8,
    coursesInProgress: 2
  })

  // Simulate checking auth state on mount
  useEffect(() => {
    // In a real app, you'd check authentication here
    // For demo purposes, we'll start as logged out
    const checkAuth = () => {
      // Check localStorage, cookies, or auth context
      const savedAuthState = localStorage.getItem('isLoggedIn')
      setIsLoggedIn(savedAuthState === 'true')
    }

    checkAuth()
  }, [])

  // Show loading while checking auth state
  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SkillPath...</p>
        </div>
      </div>
    )
  }

  // Render appropriate homepage based on auth state
  if (isLoggedIn) {
    return <LoggedInHome user={user} />
  }

  return <NonLoggedInHome />
}