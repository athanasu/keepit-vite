import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { renderWithProviders } from '~/testing'

import App from '.'

it('should render <App />', async () => {
  renderWithProviders(<App />)
  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
})
