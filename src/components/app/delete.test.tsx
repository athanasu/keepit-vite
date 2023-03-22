import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { getUrl } from '~/helpers/get-url'
import { LENGTH } from '~/mocks/handlers'
import { server } from '~/mocks/server'
import { renderWithProviders } from '~/testing'

import App from '.'

const deleteTransaltion = () => {
  const deleteBtn = screen.queryAllByRole('button', { name: /delete/i })
  userEvent.click(deleteBtn[0])
  userEvent.click(deleteBtn[0])
}

const slowDeleteTransaltionAction = () => {
  const deleteBtn = screen.queryAllByRole('button', { name: /delete/i })
  userEvent.click(deleteBtn[0])
}

beforeEach(async () => {
  renderWithProviders(<App />)
  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))
})

it('should click on delete once and wait until the button returns to original state', async () => {
  slowDeleteTransaltionAction()
  await screen.findByText(/click to confirm/i)
  await waitFor(() => expect(screen.queryByText(/click to confirm/i)).not.toBeInTheDocument())
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH))
})

it('should delete a translation susccessfully', async () => {
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH))
  expect(screen.getByTestId('total').textContent).toContain(`Total: ${LENGTH}`)
  deleteTransaltion()
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH - 1))
  deleteTransaltion()
  await waitFor(async () => await expect(screen.findAllByTestId('card')).resolves.toHaveLength(LENGTH - 2))
})
