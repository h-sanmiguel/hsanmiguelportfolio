import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export const ThemeToggle = () => {
  try {
    const { theme, toggleTheme } = useTheme()

    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg border border-gray-400 dark:border-gray-600 hover:border-blue-500 transition bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer hover:scale-110 active:scale-95"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )}
      </button>
    )
  } catch (error) {
    // Fallback if not in provider
    return null
  }
}
