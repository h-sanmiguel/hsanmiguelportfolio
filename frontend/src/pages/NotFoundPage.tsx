import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Content */}
        <div className="text-center space-y-8">
          <h1 className="text-8xl sm:text-9xl lg:text-[140px] font-bold text-gray-300 dark:text-gray-700">
            404
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist.
          </p>

          <button
            onClick={() => navigate('/')}
            className="inline-block mt-12 px-8 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg text-base sm:text-lg font-medium transition-colors cursor-pointer"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
