import { useTheme } from "./ThemeProvider"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-secondary ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-primary hover:text-primary/90 transition-colors" />
      ) : (
        <Moon size={18} className="text-primary hover:text-primary/90 transition-colors" />
      )}
    </button>
  )
}