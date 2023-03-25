import React from 'react'

const FlashcardsContext = React.createContext(undefined as unknown)
FlashcardsContext.displayName = 'FlashcardsContext'

export interface FlashcardsProviderProps {
  correctAnswers: number
  setCorrectAnswers: (value: boolean) => void
  children?: React.ReactNode
}

export function FlashcardsProvider({ correctAnswers, setCorrectAnswers, children }: FlashcardsProviderProps) {
  return (
    <FlashcardsContext.Provider value={{ correctAnswers, setCorrectAnswers }}>{children}</FlashcardsContext.Provider>
  )
}

export function useFlashcards() {
  const context = React.useContext(FlashcardsContext)
  if (!context) {
    throw new Error('useFlashcards must be used within the FlashcardsProvider')
  }
  return context
}
