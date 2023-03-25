import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FLASHCARDS_LENGTH } from '~/mocks/handlers'
import { renderWithProviders } from '~/testing'

import { FlashcardsPage } from '.'

beforeEach(async () => {
  renderWithProviders(<FlashcardsPage />)
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
})

it(`should render <FlashcardsPage /> with ${FLASHCARDS_LENGTH} flashcards`, async () => {
  screen.getByRole('button', { name: /complete/i })
  screen.getByTestId('flashcards-limit-select')
  await waitFor(async () => await expect(screen.findAllByTestId('flashcard')).resolves.toHaveLength(FLASHCARDS_LENGTH))
})

it('should complete the flashcard test with 0% success', async () => {
  userEvent.click(screen.getByRole('button', { name: /complete/i }))
  await screen.findByText('0%')
})

it('should complete the flashcard test with 6% success', async () => {
  userEvent.click(screen.getByTestId('flashcard-checkbox-1'))
  userEvent.click(screen.getByRole('button', { name: /complete/i }))
  await screen.findByText('6%')
})

it('should complete the flashcard test with 0% success after double clicking a checkbox', async () => {
  userEvent.click(screen.getByTestId('flashcard-checkbox-1'))
  userEvent.click(screen.getByTestId('flashcard-checkbox-1'))
  userEvent.click(screen.getByRole('button', { name: /complete/i }))
  await screen.findByText('0%')
})

it('should complete the flashcard test restart it', async () => {
  userEvent.click(screen.getByTestId('flashcard-checkbox-1'))
  userEvent.click(screen.getByRole('button', { name: /complete/i }))
  const restart = await screen.findByText(/restart/i)
  userEvent.click(restart)
  const complete = await screen.findByText(/complete/i)
  userEvent.click(complete)
  await screen.findByText('0%')
})
