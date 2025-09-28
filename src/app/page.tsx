import JobSearchForm from '@/components/JobSearchForm'
import { Search, Target, BookOpen, Upload } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="w-full py-6 px-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SkillPath
            </span>
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Discover the skills you need for your dream job
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
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

        {/* Placement Assessment CTA */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-8 border">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready for a placement assessment?
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Get a comprehensive analysis of your readiness for specific job roles with personalized development plans and interview preparation.
            </p>
            <Link 
              href="/assessment"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition"
            >
              <Target className="w-5 h-5" />
              <span>Take Assessment</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}