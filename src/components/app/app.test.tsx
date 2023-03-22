import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { LENGTH } from '~/mocks/handlers'
import * as testing from '~/testing'

import App from '.'

const toggleColorSchemeMock = vi.fn()

beforeEach(async () => {
  testing.renderWithProviders(<App />, { toggleColorScheme: toggleColorSchemeMock })
  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))
})

it(`should render <App /> with ${LENGTH} mocked translations`, async () => {
  await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH)
})

it('should toggle color scheme', async () => {
  const toggleColorSchemeButton = screen.getByRole('button', {
    name: /toggle color scheme/i,
  })
  userEvent.click(toggleColorSchemeButton)
  await waitFor(() => expect(toggleColorSchemeMock).toHaveBeenCalledOnce())
})
