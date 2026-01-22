import { Mail, Phone, Code, Briefcase, MapPin, Linkedin, Github, Link2, Instagram, Facebook, Quote } from 'lucide-react'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ThemeToggle } from './components/ThemeToggle'
import { ChatBot } from './components/ChatBot'
import { TechStackPage } from './pages/TechStackPage'
import { ProfileSkeleton, SectionSkeleton } from './components/SkeletonLoader'
import './App.css'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tech-stack" element={<TechStackPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

const HomePage = () => {
  const [isHoveringProfile, setIsHoveringProfile] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [dailyQuotes, setDailyQuotes] = React.useState<Array<{ text: string; author: string }>>([])

  React.useEffect(() => {
    // Simulate loading time - remove this if you have real data loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    const fetchDailyQuotes = async () => {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'mixtral-8x7b-32768',
            messages: [
              {
                role: 'user',
                content: 'Generate 3 unique and inspiring motivational quotes for today. Format each quote on a new line as: "Quote text" — Author Name. Only provide the 3 quotes, nothing else.',
              },
            ],
            temperature: 0.8,
            max_tokens: 500,
          }),
        })

        const data = await response.json()
        const content = data.choices[0].message.content

        // Parse the quotes from the response
        const quoteLines = content.split('\n').filter((line: string) => line.trim().length > 0)
        const parsedQuotes = quoteLines.map((line: string) => {
          const match = line.match(/"([^"]+)"\s*[—-]\s*(.+)/)
          if (match) {
            return { text: match[1], author: `— ${match[2].trim()}` }
          }
          return null
        }).filter((q: any) => q !== null)

        setDailyQuotes(parsedQuotes.slice(0, 3))
      } catch (error) {
        console.error('Failed to fetch quotes:', error)
        // Fallback quotes
        setDailyQuotes([
          { text: 'The only way to do great work is to love what you do.', author: '— Steve Jobs' },
          { text: "Don't watch the clock; do what it does. Keep going.", author: '— Sam Levenson' },
          { text: 'The future belongs to those who believe in the beauty of their dreams.', author: '— Eleanor Roosevelt' },
        ])
      }
    }

    fetchDailyQuotes()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
        <ChatBot />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Profile Header */}
        {isLoading ? <ProfileSkeleton /> : (
        <div className="flex flex-row gap-6 mb-12 items-start relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <img 
            src={isHoveringProfile ? "/67pic.gif" : "/hansprofile.jpg"} 
            alt="Hans San Miguel" 
            className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-xl flex-shrink-0 shadow-lg object-cover cursor-pointer transition-all float"
            onMouseEnter={() => setIsHoveringProfile(true)}
            onMouseLeave={() => setIsHoveringProfile(false)}
          />
          
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white text-black">Hans San Miguel</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                  <MapPin size={16} className="text-gray-500 dark:text-gray-500 flex-shrink-0" />
                  Camarines Sur, Philippines
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-3 mb-6 font-medium">Frontend Developer • UI/UX Design</p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-2">
              <a href="https://calendly.com/sanmiguelhansernie/30min" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 sm:px-4 sm:py-1.5 border border-gray-400 dark:border-gray-600 rounded-lg text-xs sm:text-sm hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition flex items-center justify-center gap-2 bg-white dark:bg-transparent text-black dark:text-white cursor-pointer hover:scale-105 active:scale-95 active:shadow-inner">
                <Phone size={14} />
                Schedule a Call
              </a>
              <a href="mailto:sanmiguelhansernie@gmail.com" className="px-3 py-1.5 sm:px-4 sm:py-1.5 border border-gray-400 dark:border-gray-600 rounded-lg text-xs sm:text-sm hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition flex items-center justify-center gap-2 bg-white dark:bg-transparent text-black dark:text-white cursor-pointer hover:scale-105 active:scale-95 active:shadow-inner">
                <Mail size={14} />
                Send Email
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 sm:px-4 sm:py-1.5 border border-gray-400 dark:border-gray-600 rounded-lg text-xs sm:text-sm hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition flex items-center justify-center gap-2 bg-white dark:bg-transparent text-black dark:text-white cursor-pointer hover:scale-105 active:scale-95 active:shadow-inner">
                <Briefcase size={14} />
                View Full Resume
              </a>
            </div>
          </div>
        </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            {isLoading ? <SectionSkeleton /> : (
            <section className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl p-6 transition-colors card-hover fade-in">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-black dark:text-white">
                <Code size={22} className="text-blue-600 dark:text-blue-400" />
                About
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                <p>
                  I'm an aspiring frontend web developer and UI/UX designer passionate about creating beautiful, functional, and user-centered digital experiences. I'm committed to mastering modern web development technologies and design principles.
                </p>
                <p>
                  My focus is on building responsive web applications using React, TypeScript, and Tailwind CSS. I believe great design is about understanding user needs and creating intuitive interfaces that solve real problems while delivering exceptional user experiences.
                </p>
                <p>
                  I'm currently in college, continuously learning best practices, exploring new technologies, and working on projects that challenge me to grow as a developer. I'm dedicated to writing clean, maintainable code and creating beautiful interfaces.
                </p>
              </div>
            </section>
            )}

            {/* Tech Stack Section */}
            {isLoading ? <SectionSkeleton /> : (
            <section className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl p-6 transition-colors card-hover fade-in">
              <div className="flex justify-between items-center gap-3 mb-4">
                <h2 className="text-xl font-bold flex items-center gap-3 text-black dark:text-white">
                  <Code size={22} className="text-purple-600 dark:text-purple-400" />
                  Tech Stack
                </h2>
                <Link to="/tech-stack" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-medium transition-colors cursor-pointer hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-xs uppercase tracking-wider">Frontend</h3>
                  <div className="flex gap-2 flex-wrap">
                    {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3'].map((tech) => (
                      <span key={tech} className="px-3 py-1.5 border border-gray-400 dark:border-gray-700 rounded-full text-xs font-medium bg-white dark:bg-gray-800 text-black dark:text-gray-200 cursor-default hover:scale-105 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-400 transition">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-xs uppercase tracking-wider">Tools & Design</h3>
                  <div className="flex gap-2 flex-wrap">
                    {['Figma', 'Trello', 'Git', 'VS Code', 'Chrome DevTools', 'Webpack', 'npm', 'GitHub'].map((tool) => (
                      <span key={tool} className="px-3 py-1.5 border border-gray-400 dark:border-gray-700 rounded-full text-xs font-medium bg-white dark:bg-gray-800 text-black dark:text-gray-200 cursor-default hover:scale-105 hover:shadow-md hover:border-orange-500 dark:hover:border-orange-400 transition">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            )}

            {/* Projects Section */}
            {isLoading ? <SectionSkeleton /> : (
            <section className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl p-6 transition-colors card-hover fade-in">
              <div className="flex justify-between items-center gap-3 mb-4">
                <h2 className="text-xl font-bold flex items-center gap-3 text-black dark:text-white">
                  <Code size={22} className="text-indigo-600 dark:text-indigo-400" />
                  Projects
                </h2>
                {[
                  {
                    title: 'Appoint - Appointment Booking',
                    description: 'A modern appointment booking application with video call and call features for scheduling and management.',
                    tech: ['React', 'Vite', 'JavaScript', 'Tailwind CSS'],
                    link: 'https://appoint-ptpt.onrender.com/'
                  },
                ].length > 3 && (
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-medium transition-colors cursor-pointer hover:underline">
                    View All
                  </a>
                )}
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    title: 'Appoint - Appointment Booking',
                    description: 'A modern appointment booking application with video call and call features for scheduling and management.',
                    tech: ['React', 'Vite', 'JavaScript', 'Tailwind CSS'],
                    link: 'https://appoint-ptpt.onrender.com/'
                  },
                ].map((project, idx) => (
                  <div key={idx} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 dark:hover:border-indigo-400 transition">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-semibold text-sm text-black dark:text-white">{project.title}</h3>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-xs font-medium transition-colors cursor-pointer">
                      View Project →
                    </a>
                  </div>
                ))}
              </div>
            </section>
            )}

            {/* Testimonials Section */}
            {isLoading ? <SectionSkeleton /> : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Testimonials Column */}
              <section className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl p-6 transition-colors card-hover fade-in">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-black dark:text-white">
                  <Quote size={22} className="text-purple-600 dark:text-purple-400" />
                  Testimonials
                </h2>
                
                <div className="space-y-4">
                  {[].length > 0 ? (
                    [].map((testimonial, idx) => (
                      <div key={idx} className="border-l-4 border-purple-500 dark:border-purple-400 pl-4 py-2 bg-white dark:bg-gray-800 p-3 rounded">
                        <p className="text-xs text-gray-700 dark:text-gray-300 italic mb-2">\"{testimonial.quote}\"</p>
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200\">{testimonial.author}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400\">{testimonial.role}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-600 dark:text-gray-400 italic">No testimonials yet. Check back soon!</p>
                  )}
                </div>
              </section>

              {/* Motivational Quotes Column */}
              <section className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl p-6 transition-colors card-hover fade-in">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-black dark:text-white">
                  <Quote size={22} className="text-pink-600 dark:text-pink-400" />
                  Quotes for Inspiration
                </h2>
                
                <div className="space-y-3">
                  {dailyQuotes.length > 0 ? (
                    dailyQuotes.map((quote, idx) => (
                      <div key={idx} className="border-l-4 border-pink-500 dark:border-pink-400 pl-4 py-2 bg-white dark:bg-gray-800 p-3 rounded">
                        <p className="text-xs text-gray-700 dark:text-gray-300 italic mb-2\">{quote.text}</p>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400\">{quote.author}</p>
                      </div>
                    ))
                  ) : (
                    [
                      { text: 'The only way to do great work is to love what you do.', author: '— Steve Jobs' },
                      { text: "Don't watch the clock; do what it does. Keep going.", author: '— Sam Levenson' },
                      { text: 'The future belongs to those who believe in the beauty of their dreams.', author: '— Eleanor Roosevelt' },
                    ].map((quote, idx) => (
                      <div key={idx} className="border-l-4 border-pink-500 dark:border-pink-400 pl-4 py-2 bg-white dark:bg-gray-800 p-3 rounded">
                        <p className="text-xs text-gray-700 dark:text-gray-300 italic mb-2\">{quote.text}</p>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400\">{quote.author}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Experience Section */}
            {isLoading ? <SectionSkeleton /> : (
            <section className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl p-5 transition-colors card-hover fade-in">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-black dark:text-white">
                <Briefcase size={22} className="text-green-600 dark:text-green-400" />
                Experience
              </h2>
              
              <div className="space-y-2">
                {[
                  { title: 'BS Information Technology', company: 'Ateneo de Naga University', year: '2023 - Current' },
                  { title: 'Wrote My First Code', company: 'Started my coding journey', year: '2023' },
                ].map((exp, idx) => (
                  <div key={idx} className="flex gap-2 py-1.5">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-semibold text-xs text-black dark:text-white">{exp.title}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full flex-shrink-0">{exp.year}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{exp.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            )}

            {/* Social Links */}
            {isLoading ? <SectionSkeleton /> : (
            <section className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl p-5 transition-colors card-hover fade-in">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-black dark:text-white">
                <Link2 size={22} className="text-pink-600 dark:text-pink-400" />
                Social Links
              </h2>
              
              <div className="space-y-2">
                <a href="https://www.linkedin.com/in/hans-san-miguel-2404a1296/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer group">
                  <div className="p-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition">
                    <Linkedin size={16} className="text-[#0A66C2]" />
                  </div>
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a href="https://github.com/h-sanmiguel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition cursor-pointer group">
                  <div className="p-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition">
                    <Github size={16} />
                  </div>
                  <span className="font-medium">GitHub</span>
                </a>
                <a href="https://www.instagram.com/hansprknbeans/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition cursor-pointer group">
                  <div className="p-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg group-hover:bg-pink-100 dark:group-hover:bg-pink-900 transition">
                    <Instagram size={16} />
                  </div>
                  <span className="font-medium">Instagram</span>
                </a>
                <a href="https://www.facebook.com/hansprknbeans" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer group">
                  <div className="p-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition">
                    <Facebook size={16} className="text-[#1877F2]" />
                  </div>
                  <span className="font-medium">Facebook</span>
                </a>
                <a href="mailto:sanmiguelhansernie@gmail.com" className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer group">
                  <div className="p-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg group-hover:bg-red-100 dark:group-hover:bg-red-900 transition">
                    <Mail size={16} />
                  </div>
                  <span className="font-medium truncate">sanmiguelhansernie@gmail.com</span>
                </a>
              </div>
            </section>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Certifications Section */}
          {isLoading ? <SectionSkeleton /> : (
          <section className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl p-5 transition-colors lg:col-span-2 card-hover fade-in">
          <div className="flex justify-between items-center gap-3 mb-3">
            <h2 className="text-xl font-bold flex items-center gap-3 text-black dark:text-white">
              <Code size={22} className="text-amber-600 dark:text-amber-400" />
              Certifications
            </h2>
            {[
              { title: 'IT Essentials', issuer: 'Cisco Networking Academy', year: '2026' },
            ].length > 4 && (
              <Link to="/certifications" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-medium transition-colors cursor-pointer hover:underline">
                View All
              </Link>
            )}
          </div>
          
          <div className="space-y-2">
            {[
              { title: 'IT Essentials', issuer: 'Cisco Networking Academy', year: '2026' },
            ].map((cert, idx) => (
              <div key={idx} className="flex gap-2 py-1.5">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 mt-1.5"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-semibold text-xs text-black dark:text-white">{cert.title}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full flex-shrink-0">{cert.year}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}
        </div>

        {/* Footer Section */}
        <footer className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <p>&copy; 2026 Hans San Miguel. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
