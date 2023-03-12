import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { renderWithProviders } from '~/testing'

import { MainContent } from '.'

it('should render <MainContent />', async () => {
  renderWithProviders(<MainContent />)

  // Loader
  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
  // Total
  screen.getByText(/total/i)
  // Pagination
  screen.getByTestId('pagination')
  // Limit select
  screen.getByTestId('limit-select')
  // Content
  await expect(screen.findAllByTestId('card')).resolves.toHaveLength(50)
})
