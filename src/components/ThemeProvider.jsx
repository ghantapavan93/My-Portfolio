import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({
  theme: "light", // Changed default value to light
  setTheme: () => null,
  toggleTheme: () => null,
})

export function ThemeProvider({ children, defaultTheme = "light", storageKey = "theme" }) {
  const [theme, setTheme] = useState(() => {
    // Check if theme exists in localStorage
    const storedTheme = localStorage.getItem(storageKey)
    
    // If preference exists in localStorage, use it
    if (storedTheme) {
      return storedTheme
    }
    
    // Always default to light theme instead of checking system preference
    return defaultTheme
  })

  // Update the data-theme attribute on the html element
  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute("data-theme", theme)
    
    // Remove the old class and add the new one
    if (theme === "dark") {
      root.classList.add("dark")
      root.classList.remove("light")
    } else {
      root.classList.add("light")
      root.classList.remove("dark")
    }
    
    // Save the theme preference to localStorage
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  
  return context
}