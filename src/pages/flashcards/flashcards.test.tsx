import { screen } from '@testing-library/react'
import { renderWithProviders } from '~/testing'

import { FlashcardsPage } from '.'

it('should render <FlashcardsPage />', async () => {
  renderWithProviders(<FlashcardsPage />)
  screen.getByText('flashcards')
})
