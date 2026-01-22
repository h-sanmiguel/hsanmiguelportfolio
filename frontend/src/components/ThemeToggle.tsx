import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export const ThemeToggle = () => {
  try {
    const { theme, toggleTheme } = useTheme()

    return (
      <button
        onClick={toggleTheme}
        className="px-2.5 py-2 rounded-lg border border-gray-400 dark:border-gray-600 hover:border-blue-500 transition bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer hover:scale-110 active:scale-95 flex items-center gap-1.5"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Moon size={18} className="text-blue-500" />
        ) : (
          <Sun size={18} className="text-yellow-500" />
        )}
      </button>
    )
  } catch (error) {
    // Fallback if not in provider
    return null
  }
}
