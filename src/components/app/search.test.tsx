import { screen, waitForElementToBeRemoved } from '@testing-library/react'
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

it.todo('should search an item susccessfully')

it.todo('should search an item that does not exist')
