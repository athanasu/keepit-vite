import { RingProgress, Text } from '@mantine/core'

interface ProgressProps {
  correctAnswers: number
  length: number
}

export const Progress = ({ correctAnswers, length }: ProgressProps) => (
  <RingProgress
    sections={[{ value: Math.floor((correctAnswers / length) * 100), color: 'blue' }]}
    label={
      <Text color="blue" weight={700} align="center" size="xl">
        {Math.floor((correctAnswers / length) * 100)}%
      </Text>
    }
  />
)
