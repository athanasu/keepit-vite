import { screen } from '@testing-library/react'
import chance from 'chance'
import { getTestItem } from '~/helpers/get-test-item'
import { renderWithProviders } from '~/testing'

import { TranslationForm } from '.'

it('should render <TranslationForm /> in create mode', () => {
  renderWithProviders(<TranslationForm />)
  // original label input
  screen.getByRole('textbox', { name: /original/i })
  // translation label input
  screen.getByRole('textbox', { name: /translation/i })
  // notes label input
  screen.getByRole('textbox', { name: /notes/i })
  // save changes button
  screen.getByRole('button', { name: /keep it/i })
})

it('should render <TranslationForm /> in create mode, triggered by a user search', () => {
  const searchQuery = chance().word({ length: 5 })
  renderWithProviders(<TranslationForm from={searchQuery} />)
  // original label input
  screen.getByRole('textbox', { name: /original/i })
  screen.getByDisplayValue(searchQuery)
  // translation label input
  screen.getByRole('textbox', { name: /translation/i })
  // notes label input
  screen.getByRole('textbox', { name: /notes/i })
  // save changes button
  screen.getByRole('button', { name: /keep it/i })
})

it('should render <TranslationForm /> in edit mode', () => {
  const item = getTestItem()
  renderWithProviders(<TranslationForm item={item} />)
  // original label input
  screen.getByRole('textbox', { name: /original/i })
  screen.getByDisplayValue(item.from)
  // translation label input
  screen.getByRole('textbox', { name: /translation/i })
  screen.getByDisplayValue(item.to)
  // notes label input
  screen.getByRole('textbox', { name: /notes/i })
  screen.getByDisplayValue(item.notes)
  // save changes button
  screen.getByRole('button', { name: /save changes/i })
})

it.todo('should show notification error')
