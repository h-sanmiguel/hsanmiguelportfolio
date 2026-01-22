import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'

export const TechStackPage = () => {
  const navigate = useNavigate()

  const frontend = ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3']
  const tools = ['Figma', 'Trello', 'Git', 'VS Code', 'Chrome DevTools', 'Webpack', 'npm', 'GitHub']

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <ThemeToggle />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-black dark:text-white">
          Tech Stack
        </h1>

        {/* Frontend Section */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-4">Frontend</h2>
          <div className="flex gap-2 flex-wrap">
            {frontend.map((tech) => (
              <span key={tech} className="px-3 py-1.5 border border-gray-400 dark:border-gray-700 rounded-full text-xs font-medium bg-white dark:bg-gray-800 text-black dark:text-gray-200 hover:border-blue-500 dark:hover:border-blue-400 transition">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-4">Tools & Design</h2>
          <div className="flex gap-2 flex-wrap">
            {tools.map((tool) => (
              <span key={tool} className="px-3 py-1.5 border border-gray-400 dark:border-gray-700 rounded-full text-xs font-medium bg-white dark:bg-gray-800 text-black dark:text-gray-200 hover:border-purple-500 dark:hover:border-purple-400 transition">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
