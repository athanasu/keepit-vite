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

it('should update an entry susccessfully', async () => {
  const spy = vi.spyOn(api, 'updateTranslation')
  const updatedTo = 'edited translation'
  const updatedNotes = 'edited notes'

  // Total translations should be correct
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(25))
  expect(screen.getByTestId('total').textContent).toContain(`Total: ${LENGTH}`)

  // Updated data should not exist
  expect(screen.queryByText(updatedTo)).not.toBeInTheDocument()
  expect(screen.queryByText(updatedNotes)).not.toBeInTheDocument()

  // Open translation form
  expect(screen.queryByTestId('translation-form')).not.toBeInTheDocument()
  const updateBtn = screen.queryAllByRole('button', { name: /edit/i })
  userEvent.click(updateBtn[0])
  await screen.findByTestId('translation-form')

  // Fill form
  const translationInput = screen.getByRole('textbox', { name: /translation/i })
  const notesInput = screen.getByRole('textbox', { name: /notes/i })
  const saveBtn = screen.getByRole('button', { name: /save changes/i })
  userEvent.clear(translationInput)
  await userEvent.type(translationInput, updatedTo)
  userEvent.clear(notesInput)
  await userEvent.type(notesInput, updatedNotes)
  await userEvent.click(saveBtn)

  expect(spy).toHaveBeenCalledWith('1', { from: expect.any(String), to: updatedTo, notes: updatedNotes })

  // Total translations should be the same
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH))
  expect(screen.getByTestId('total').textContent).toContain(`Total: ${LENGTH}`)

  // Updated data should exist
  screen.getByText(updatedTo)
  screen.getByDisplayValue(updatedNotes)
})
