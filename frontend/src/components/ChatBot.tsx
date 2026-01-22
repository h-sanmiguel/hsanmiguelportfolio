import React, { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'

const API_KEY = import.meta.env.VITE_GROQ_API_KEY

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

// Function to parse and render text with clickable links and line breaks
const renderMessageWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  
  return text.split('\n').map((line, lineIndex) => {
    const parts = line.split(urlRegex)
    
    return (
      <div key={lineIndex}>
        {parts.map((part, index) => {
          if (urlRegex.test(part)) {
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition cursor-pointer break-all"
              >
                {part}
              </a>
            )
          }
          return <span key={index}>{part}</span>
        })}
      </div>
    )
  })
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! 👋 Ask me anything about Hans\'s skills and experience.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError('')

    try {
      if (!API_KEY) {
        throw new Error('API key is not configured')
      }

      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content: `You are Hans San Miguel Chat Assistant. Here's information about Hans:

ABOUT:
Hans is an aspiring frontend web developer and UI/UX designer passionate about creating beautiful, functional, and user-centered digital experiences. He is committed to mastering modern web development technologies and design principles. His focus is on building responsive web applications using React, TypeScript, and Tailwind CSS. He believes great design is about understanding user needs and creating intuitive interfaces that solve real problems while delivering exceptional user experiences. He is currently in college, continuously learning best practices, exploring new technologies, and working on projects that challenge him to grow as a developer.

TECH STACK:
Frontend: JavaScript, TypeScript, React, Next.js, Tailwind CSS, Vite, HTML5, CSS3
Tools & Design: Figma, Trello, Git, VS Code, Chrome DevTools, Webpack, npm, GitHub

EXPERIENCE:
- BS Information Technology at Ateneo de Naga University (2023 - Current)
- Wrote My First Code - Started his coding journey (2023)

CERTIFICATIONS:
- IT Essentials from Cisco Networking Academy (2026)

SOCIAL LINKS & CONTACT:
When providing links, ALWAYS format them on separate lines with clear labels:

GitHub: https://github.com/h-sanmiguel
LinkedIn: https://www.linkedin.com/in/hans-san-miguel-2404a1296/
Instagram: https://www.instagram.com/hansprknbeans/
Facebook: https://www.facebook.com/hansprknbeans
Email: sanmiguelhansernie@gmail.com
Schedule a Call: https://calendly.com/sanmiguelhansernie/30min

Instructions:
- IMPORTANT: Each link must be on its own line with the platform name, colon, and URL
- Use line breaks to separate each link
- When users ask about Hans, refer to this information
- Keep responses friendly, concise, and professional
- If asked about contact or how to reach out, provide links in the organized format above with line breaks
- If asked about skills or experience, reference the tech stack and experience sections`,
              },
              {
                role: 'user',
                content: input,
              },
            ],
            temperature: 0.7,
            max_tokens: 1024,
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || `API Error: ${response.status}`)
      }

      const data = await response.json()
      const aiText =
        data.choices?.[0]?.message?.content ||
        'Sorry, I could not generate a response.'

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'ai',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setError(errorMessage)
      
      const errorAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, I encountered an error: ${errorMessage}. Please try again later.`,
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorAIMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 px-4 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:shadow-xl transition z-40 flex items-center gap-2 font-medium cursor-pointer hover:scale-110 active:scale-95"
          aria-label="Open chat"
        >
          <MessageCircle size={20} />
          <span>Chat with Hans</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[550px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">Ask Hans</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <p className="leading-relaxed">{renderMessageWithLinks(msg.text)}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={sendMessage}
            className="p-6 border-t border-gray-100 dark:border-gray-800 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer hover:scale-105 active:scale-95 disabled:hover:scale-100"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
