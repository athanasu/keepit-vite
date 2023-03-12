import { screen } from '@testing-library/react'
import { renderWithProviders } from '~/testing'

import { Header } from '.'

it('should render <Header />', () => {
  renderWithProviders(<Header />)
  screen.getByTestId('header')
  screen.getByRole('searchbox')
  screen.getByPlaceholderText(/looking for something\?/i)
  screen.getByRole('button', { name: /new/i })
  screen.getByRole('button', { name: /toggle color scheme/i })
  screen.getByTestId('shortcuts')
})
