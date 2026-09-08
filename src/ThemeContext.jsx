import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  return <ThemeContext value={{ isDark, setIsDark }}>{children}</ThemeContext>;
}
