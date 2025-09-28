'use client'

import { useState } from 'react'
import { Search, MapPin, Briefcase, Loader2 } from 'lucide-react'
import SkillAnalysis from './SkillAnalysis'

interface MockAnalysisData {
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

export default function JobSearchForm() {
  const [jobTitle, setJobTitle] = useState('')
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [analysisData, setAnalysisData] = useState<MockAnalysisData | null>(null)

  // Popular job suggestions
  const popularJobs = [
    'Software Engineer',
    'Data Scientist', 
    'Product Manager',
    'UX Designer',
    'Digital Marketer',
    'DevOps Engineer'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!jobTitle.trim()) return

    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock analysis data - in real implementation, this would come from your API
    const mockData: MockAnalysisData = {
      jobTitle,
      location: location || 'Remote',
      totalJobs: Math.floor(Math.random() * 1000) + 100,
      skills: {
        technical: [
          'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 
          'Git', 'AWS', 'Docker', 'TypeScript', 'REST APIs'
        ],
        soft: [
          'Problem Solving', 'Communication', 'Teamwork', 
          'Adaptability', 'Time Management', 'Critical Thinking'
        ]
      },
      salaryRange: {
        min: Math.floor(Math.random() * 50000) + 50000,
        max: Math.floor(Math.random() * 100000) + 100000
      },
      experience: 'Mid-level (2-5 years)',
      growth: '+12% year over year'
    }
    
    setAnalysisData(mockData)
    setIsLoading(false)
    setShowResults(true)
  }

  const handleJobSuggestionClick = (job: string) => {
    setJobTitle(job)
  }

  return (
    <div className="w-full">
      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Job Title Input */}
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="jobTitle"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Software Engineer, Data Scientist"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location (Optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., San Francisco, Remote"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Skills...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Analyze Skills</span>
              </>
            )}
          </button>
        </form>

        {/* Popular Job Suggestions */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {popularJobs.map((job) => (
              <button
                key={job}
                onClick={() => handleJobSuggestionClick(job)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
              >
                {job}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResults && analysisData && (
        <SkillAnalysis data={analysisData} />
      )}
    </div>
  )
}