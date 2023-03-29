import { RingProgress, Text } from '@mantine/core'

interface ProgressProps {
  correctAnswers: number
  length: number
}

export const getProgressColor = (successPercentage: number) => {
  if (successPercentage < 50) {
    return 'red'
  } else if (successPercentage < 75) {
    return 'yellow'
  } else {
    return 'green'
  }
}

export const Progress = ({ correctAnswers, length }: ProgressProps) => {
  const successPercentage = Math.floor((correctAnswers / length) * 100)

  const color = getProgressColor(successPercentage)
  return (
    <RingProgress
      sections={[{ value: successPercentage, color }]}
      label={
        <Text color={color} weight={700} align="center" size="xl">
          {successPercentage}%
        </Text>
      }
    />
  )
}
