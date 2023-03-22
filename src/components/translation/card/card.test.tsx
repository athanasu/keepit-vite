import { screen } from '@testing-library/react'
import { getTestItem } from '~/helpers/get-test-item'
import { renderWithProviders } from '~/testing'

import { TranslationCard } from '.'

it('should render <TranslationCard />', () => {
  const item = getTestItem()
  renderWithProviders(<TranslationCard item={item} />)
  // id label
  screen.getByTestId('id')
  // createdAt label
  screen.getByTestId('created-at')
  // delete button
  screen.getByRole('button', { name: /delete/i })
  // edit button
  screen.getByRole('button', { name: /edit/i })
  // notes section
  screen.getByText(/notes:/i)
})

it.todo('should show notification error')
