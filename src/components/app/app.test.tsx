import { screen } from '@testing-library/react'
import { renderWithProviders } from '~/testing'

import App from '.'

it('should render <App />', () => {
  renderWithProviders(<App />)
  screen.debug()
})
