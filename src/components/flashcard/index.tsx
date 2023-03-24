import { Box, Button, Collapse, Group, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Translation } from '~/types'

export const Flashcard = ({ item }: { item: Translation }) => {
  const [opened, { toggle }] = useDisclosure(false)

  return (
    <Box maw={400} mx="auto">
      <Group position="center" mb={5}>
        <Button onClick={toggle}>{item.from}</Button>
      </Group>

      <Collapse in={opened}>
        <Text>{item.to}</Text>
      </Collapse>
    </Box>
  )
}
