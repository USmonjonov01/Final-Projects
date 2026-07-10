import { createContext, useContext, useReducer } from "react"

const ThemeContext = createContext()

export const ThemeData = () => useContext(ThemeContext)

const initialState = {
  isDark: localStorage.getItem("theme") === "dark",
}

const reducer = (state, { type }) => {
  switch (type) {
    case "dark":
      localStorage.setItem("theme", "dark")
      return { ...state, isDark: true }
    case "light":
      localStorage.setItem("theme", "light")
      return { ...state, isDark: false }
    default:
      return state
  }
}

export function ThemeProvider({ children }) {
  const data = useReducer(reducer, initialState)
  return (
    <ThemeContext.Provider value={data}>
      {children}
    </ThemeContext.Provider>
  )
}