import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = prefersDark ? 'dark' : 'light'
      setTheme(initialTheme)
      applyTheme(initialTheme)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', newTheme)
      applyTheme(newTheme)
      return newTheme
    })
  }

  const applyTheme = (themeToApply: 'light' | 'dark') => {
    const root = document.documentElement
    if (themeToApply === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  return { theme, toggleTheme }
}
