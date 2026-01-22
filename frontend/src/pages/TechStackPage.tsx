import { ArrowLeft, Code, Wrench } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'

export const TechStackPage = () => {
  const navigate = useNavigate()

  const frontend = ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3']
  const tools = ['Figma', 'Trello', 'Git', 'VS Code', 'Chrome DevTools', 'Webpack', 'npm', 'GitHub']

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition cursor-pointer hover:-translate-x-1 active:-translate-x-0.5"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <ThemeToggle />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 dark:text-white text-black">
          Complete Tech Stack
        </h1>

        {/* Frontend Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Code size={28} className="text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">Frontend Technologies</h2>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {frontend.map((tech) => (
                <div key={tech} className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 dark:hover:border-blue-400 transition cursor-default hover:scale-105 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-600">
                  <p className="font-semibold text-sm sm:text-base text-black dark:text-white">{tech}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Wrench size={28} className="text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">Tools & Design</h2>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <div key={tool} className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-purple-500 dark:hover:border-purple-400 transition cursor-default hover:scale-105 hover:shadow-lg hover:bg-purple-50 dark:hover:bg-gray-600">
                  <p className="font-semibold text-sm sm:text-base text-black dark:text-white">{tool}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-black dark:text-white">About My Stack</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
            I'm experienced with modern frontend technologies and tools that help me build responsive, performant, and user-friendly applications. My tech stack is carefully chosen to ensure best practices, scalability, and maintainability in every project I work on.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            I'm constantly learning and expanding my skills with new technologies and frameworks. If you'd like to discuss how I can help with your project using any of these technologies, feel free to reach out!
          </p>
        </section>
      </div>
    </div>
  )
}
