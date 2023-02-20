import { Badge, Card, Divider, Flex, Group, Text, Title } from '@mantine/core'
import { Translation } from '~/types/translation.types'

export function TranslationCard({ item }: { item: Translation }) {
  const createdAt = new Date(item.createdAt)
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder key={item.id}>
      <Group position="apart" mt="md" mb="xs">
        <Badge color="pink" variant="light">
          {item.id}
        </Badge>
        <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 'sm', sm: 'lg' }} justify={{ sm: 'center' }}>
          {createdAt.getDate()}/ {createdAt.getMonth() + 1} / {createdAt.getFullYear()}
        </Flex>
      </Group>

      <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 'sm', sm: 'lg' }} justify="space-evenly">
        <Title order={4}>{item.from}</Title>
      </Flex>
      <Divider
        my="xl"
        label={item.to}
        labelPosition="right"
        labelProps={{
          variant: 'gradient',
          gradient: { from: 'indigo', to: 'cyan', deg: 45 },
          sx: { fontFamily: 'Greycliff CF, sans-serif' },
          ta: 'center',
          fz: 'xl',
          fw: 700,
        }}
      />
      {item.notes && (
        <Text size="sm" color="dimmed">
          <Text c="dimmed">Notes: </Text>
          {item.notes}
        </Text>
      )}
    </Card>
  )
}
