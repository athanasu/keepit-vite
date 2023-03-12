import { QueryCache, QueryClient } from '@tanstack/react-query'
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LENGTH } from '~/mocks/handlers'
import { renderWithProviders } from '~/testing'

import App from '.'

const queryCache = new QueryCache()
const queryClient = new QueryClient()

beforeEach(async () => {
  renderWithProviders(<App />)
  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))
})

afterEach(() => {
  queryCache.clear()
  queryClient.resetQueries()
})

it(`should render <App /> with ${LENGTH} mocked translations`, async () => {
  await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH)
})

it('should create a new entry susccessfully', async () => {
  const newFrom = 'original'
  const newTo = 'translation'
  const newDescription = 'notes'

  // Total translations should be correct
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(25))
  expect(screen.getByTestId('total').textContent).toContain(`Total: ${LENGTH}`)

  // New data should not exist
  expect(screen.queryByText(newFrom)).not.toBeInTheDocument()
  expect(screen.queryByText(newTo)).not.toBeInTheDocument()
  expect(screen.queryByText(newDescription)).not.toBeInTheDocument()

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
  await userEvent.type(notesInput, newDescription)
  await userEvent.click(saveBtn)

  // Total translations should be updated correctly
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH + 1))
  expect(screen.getByTestId('total').textContent).toContain(`Total: ${LENGTH + 1}`)

  // New data should exist
  screen.getByText(newFrom)
  screen.getByText(newTo)
  screen.getByDisplayValue(newDescription)
})

// TODO: Fix query cache persistency between tests
it('should delete an entry susccessfully', async () => {
  expect(screen.queryByText('original')).not.toBeInTheDocument()
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH))
  // expect(screen.getByTestId('total').textContent).toContain(`Total: ${LENGTH}`)

  // const deleteBtn = screen.queryAllByRole('button', { name: /delete/i })
  // userEvent.click(deleteBtn[0])
  // userEvent.click(deleteBtn[0])

  // await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(24))
  // expect(screen.getByTestId('total').textContent).toContain(`Total: ${LENGTH - 1}`)
})

it.todo('should update an item susccessfully')

it.todo('should search an item susccessfully')

it.todo('should search an item that does not exist')

it.todo('should change limit per page susccessfully')

it.todo('should test non successfull api calls')
