import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import '../App.css'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out;
        }
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
        .animate-slideInUp-delayed {
          animation: slideInUp 0.6s ease-out 0.2s both;
        }
        .animate-slideInUp-delayed-2 {
          animation: slideInUp 0.6s ease-out 0.4s both;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-8xl sm:text-9xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 animate-float">404</h1>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black dark:text-white animate-slideInDown">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg animate-slideInUp">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 animate-slideInUp-delayed"
            >
              <Home size={18} />
              Go Back Home
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="w-full px-6 py-3 border border-gray-400 dark:border-gray-600 hover:border-gray-600 dark:hover:border-gray-400 text-black dark:text-white font-medium rounded-lg transition flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-900 cursor-pointer hover:scale-105 active:scale-95 animate-slideInUp-delayed-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl animate-slideInUp-delayed">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Lost? Navigate to <a href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">my portfolio</a> or use the buttons above.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
