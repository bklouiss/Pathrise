'use client'

import JobSearchForm from '@/components/JobSearchForm'
import { Search, Target, BookOpen, Upload, User, BarChart3, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function NonLoggedInHome() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pathrise
              </span>
            </h1>
            <p className="text-gray-600 mt-2">
              Discover the skills you need for your dream job
            </p>
          </div>
          
          {/* Sign In Button */}
          <Link 
            href="/auth"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition"
          >
            Sign In
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Path to Success
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter any job title and we'll analyze current market demands to show you 
            the skills you need and resources to develop them.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Market Analysis</h3>
            <p className="text-gray-600 text-sm">
              We scan job postings to identify the most in-demand skills
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Skill Mapping</h3>
            <p className="text-gray-600 text-sm">
              Get a clear breakdown of technical and soft skills required
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Learning Resources</h3>
            <p className="text-gray-600 text-sm">
              Discover courses, tutorials, and materials to build those skills
            </p>
          </div>
        </div>

        {/* Job Search Form */}
        <JobSearchForm />

        {/* Resume Scanner CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 border">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Already have a resume?
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Upload your resume and let our AI analyze your existing skills, compare them to market demands, and suggest personalized learning paths.
            </p>
            <Link 
              href="/resume"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition"
            >
              <Upload className="w-5 h-5" />
              <span>Scan My Resume</span>
            </Link>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">10,000+</p>
              <p className="text-sm text-gray-600">Job Searches</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">500+</p>
              <p className="text-sm text-gray-600">Skills Analyzed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">95%</p>
              <p className="text-sm text-gray-600">User Success Rate</p>
            </div>
          </div>
        </div>

        {/* Benefits Showcase */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3">
              Unlock Your Career Potential
            </h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Join professionals who've increased their earning potential by an average of 40% using our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Track Progress</h4>
              <p className="text-blue-100 text-sm">Monitor your skill development and see your growth over time</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Smart Recommendations</h4>
              <p className="text-blue-100 text-sm">Get personalized learning paths based on your career goals</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Market Insights</h4>
              <p className="text-blue-100 text-sm">Stay ahead with real-time job market and salary data</p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/auth"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg mr-4"
            >
              Start Free Today
            </Link>
            <p className="text-blue-100 text-sm mt-3">No credit card required • 5-minute setup</p>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg border">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Sarah M.</p>
                  <p className="text-sm text-gray-600">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic mb-3">
                "SkillPath helped me identify the exact skills I needed for my dream job. I landed a senior role with a 45% salary increase!"
              </p>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+45% salary increase</span>
              </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Michael R.</p>
                  <p className="text-sm text-gray-600">Data Scientist</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic mb-3">
                "The personalized learning recommendations saved me months of studying irrelevant topics. Focused learning is game-changing!"
              </p>
              <div className="flex items-center text-blue-600 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>3 months faster job transition</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="p-4 bg-white rounded-lg">
              <p className="font-medium text-gray-900 mb-2">Is SkillPath really free to start?</p>
              <p className="text-gray-600 text-sm">Yes! You can analyze jobs and get skill recommendations completely free. Premium features unlock advanced tracking and personalized learning paths.</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <p className="font-medium text-gray-900 mb-2">How accurate is the job market data?</p>
              <p className="text-gray-600 text-sm">We analyze thousands of real job postings daily from major job boards, ensuring our insights reflect current market demands.</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <p className="font-medium text-gray-900 mb-2">Can I track multiple career paths?</p>
              <p className="text-gray-600 text-sm">Absolutely! Save different job searches, compare skill requirements, and get recommendations for multiple career trajectories.</p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Link 
              href="/auth"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
            >
              <User className="w-5 h-5" />
              <span>Join Free Now</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}