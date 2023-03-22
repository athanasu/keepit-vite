import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LENGTH } from '~/mocks/handlers'
import { renderWithProviders } from '~/testing'
import { ApiResponse } from '~/types'

import App from '.'

let client: QueryClient
let selectContainer: HTMLElement

beforeEach(async () => {
  const { queryClient, container } = renderWithProviders(<App />)
  client = queryClient
  selectContainer = container
  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))
})

it('should search for an item susccessfully', async () => {
  await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH)
  const translations = client.getQueryData(['translations', { page: 1, limit: '50' }])
  const searchTranslation = (translations as ApiResponse).data[0]

  const view = screen.getByTestId('header')
  userEvent.type(within(view).getByRole('searchbox'), searchTranslation.from)
  await waitFor(() => screen.getByRole('option', { name: searchTranslation.from }))
  await waitFor(() => expect(screen.queryByText(/nothing found.. keep it, maybe?/i)).not.toBeInTheDocument())
  const option = screen.getByRole('option', { name: searchTranslation.from })
  userEvent.click(option)
  await screen.findByTestId('translation-form')
})

it("should search for item that doesn't exist", async () => {
  await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH)
  const view = screen.getByTestId('header')
  userEvent.type(within(view).getByRole('searchbox'), 'not found')
  await screen.findByTestId('nothing-found')
  const notFoundOption = screen.getByTestId('nothing-found')
  userEvent.click(notFoundOption)
  await screen.findByTestId('translation-form')
})
