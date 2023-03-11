import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { renderWithProviders } from '~/testing'

import App from '.'

it('should render <App /> with 50 mocked translations', async () => {
  renderWithProviders(<App />)
  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
  await expect(screen.findAllByTestId('card')).resolves.toHaveLength(50)
})
