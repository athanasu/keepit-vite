import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { renderWithProviders } from '~/testing'

import App from '.'

it('should render <App /> with 50 mocked translations', async () => {
  renderWithProviders(<App />)
  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))
})

it.todo('should delete an item susccessfully')

it.todo('should update an item susccessfully')

it.todo('should search an item susccessfully')

it.todo('should search an item that does not exist')

it.todo('should create an item susccessfully')

it.todo('should change limit per page susccessfully')

it.todo('should test non successfull api calls')
