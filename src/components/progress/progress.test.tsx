import { screen } from '@testing-library/react'
import { renderWithProviders } from '~/testing'

import { Progress, getProgressColor } from '.'

it('should return expected values for getProgressColor()', async () => {
  expect(getProgressColor(0)).toBe('red')
  expect(getProgressColor(49)).toBe('red')
  expect(getProgressColor(50)).toBe('yellow')
  expect(getProgressColor(74)).toBe('yellow')
  expect(getProgressColor(75)).toBe('green')
  expect(getProgressColor(100)).toBe('green')
})

it('should render <Progress />', async () => {
  renderWithProviders(<Progress correctAnswers={0} length={20} />)
  screen.getByText(/0%/i)
})
