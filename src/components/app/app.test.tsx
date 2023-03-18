import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { LENGTH } from '~/mocks/handlers'
import { renderWithProviders } from '~/testing'

import App from '.'

beforeEach(async () => {
  renderWithProviders(<App />)
  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))
})

it(`should render <App /> with ${LENGTH} mocked translations`, async () => {
  await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH)
})
