import { ColorScheme } from '@mantine/core'
import React from 'react'

const ColorSchemeContext = React.createContext(undefined as unknown)
ColorSchemeContext.displayName = 'ColorSchemeContext'

export interface ColorSchemeProviderProps {
  colorScheme: ColorScheme
  toggleColorScheme: any
  children?: React.ReactNode
}

export function ColorSchemeProvider({ colorScheme, toggleColorScheme, children }: ColorSchemeProviderProps) {
  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>{children}</ColorSchemeContext.Provider>
  )
}

export function useColorScheme() {
  const context = React.useContext(ColorSchemeContext)
  if (!context) {
    throw new Error('useColorScheme must be used within the ColorSchemeProvider')
  }
  return context
}
