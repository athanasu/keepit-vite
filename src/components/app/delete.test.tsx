import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LENGTH } from '~/mocks/handlers'
import { renderWithProviders } from '~/testing'

import App from '.'

const deleteTransaltion = () => {
  const deleteBtn = screen.queryAllByRole('button', { name: /delete/i })
  userEvent.click(deleteBtn[0])
  userEvent.click(deleteBtn[0])
}

beforeEach(async () => {
  renderWithProviders(<App />)
  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))
})

it('should delete an entry susccessfully', async () => {
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH))
  expect(screen.getByTestId('total').textContent).toContain(`Total: ${LENGTH}`)
  deleteTransaltion()
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH - 1))
  deleteTransaltion()
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH - 2))
})

it.todo('should update an item susccessfully')

it.todo('should search an item susccessfully')

it.todo('should search an item that does not exist')

it.todo('should change limit per page susccessfully')

it.todo('should test non successfull api calls')
