import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import * as api from '~/api/translations'
import { LENGTH } from '~/mocks/handlers'
import { renderWithProviders } from '~/testing'

import App from '.'

beforeEach(async () => {
  renderWithProviders(<App />)
  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))
})

it('should create a new entry susccessfully', async () => {
  const spy = vi.spyOn(api, 'addTranslation')
  const newFrom = 'original'
  const newTo = 'translation'
  const newNotes = 'notes'

  // Total translations should be correct
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(25))
  expect(screen.getByTestId('total').textContent).toContain(`Total: ${LENGTH}`)

  // New data should not exist
  expect(screen.queryByText(newFrom)).not.toBeInTheDocument()
  expect(screen.queryByText(newTo)).not.toBeInTheDocument()
  expect(screen.queryByText(newNotes)).not.toBeInTheDocument()

  // Open translation form
  expect(screen.queryByTestId('translation-form')).not.toBeInTheDocument()
  const newBtn = screen.getByRole('button', { name: /new/i })
  userEvent.click(newBtn)
  await screen.findByTestId('translation-form')

  // Fill form
  const originalInput = screen.getByRole('textbox', { name: /original/i })
  const translationInput = screen.getByRole('textbox', { name: /translation/i })
  const notesInput = screen.getByRole('textbox', { name: /notes/i })
  const saveBtn = screen.getByRole('button', { name: /keep it/i })
  await userEvent.type(originalInput, newFrom)
  await userEvent.type(translationInput, newTo)
  await userEvent.type(notesInput, newNotes)
  await userEvent.click(saveBtn)

  expect(spy).toHaveBeenCalledWith({ from: newFrom, to: newTo, notes: newNotes })

  // Total translations should be updated correctly
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH + 1))
  expect(screen.getByTestId('total').textContent).toContain(`Total: ${LENGTH + 1}`)

  // New data should exist
  screen.getByText(newFrom)
  screen.getByText(newTo)
  screen.getByDisplayValue(newNotes)
})
