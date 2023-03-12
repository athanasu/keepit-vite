import { Anchor, Badge, Button, Card, Code, Divider, Flex, Group, Text, Title } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { removeTranslation } from '~/api/translations'
import { DeleteIcon, EditIcon, InfoIcon } from '~/components/icons'
import { EditTransaltionHeader } from '~/components/modal-headers'
import { TranslationForm } from '~/components/translation/form'
import { DeleteApiResponse, Translation } from '~/types'

export function TranslationCard({ item }: { item: Translation }) {
  const queryClient = useQueryClient()
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const createdAt = new Date(item.createdAt)

  const clickToConfirm = async () => {
    setShowDeleteConfirmation(true)
    setTimeout(() => {
      setShowDeleteConfirmation(false)
    }, 1000)
  }

  const remove = async () => {
    try {
      const { data } = (await removeTranslation(item.id)) as DeleteApiResponse
      await queryClient.invalidateQueries(['translations'])

      notifications.show({
        title: 'Information',
        message: `"${data.from}" translation removed successfully`,
      })
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: JSON.stringify(error),
      })
    }
  }

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder key={item.id} data-testid="card">
      <Group position="apart" mt="md" mb="xs">
        <Badge variant="outline" data-testid="id">
          {item.id}
        </Badge>
        <Badge color="red" variant="light" data-testid="created-at">
          <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 'sm', sm: 'lg' }} justify={{ sm: 'center' }}>
            {createdAt.getDate()}/ {createdAt.getMonth() + 1} / {createdAt.getFullYear()}
          </Flex>
        </Badge>
      </Group>

      <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 'sm', sm: 'lg' }} justify="space-evenly">
        <Title order={4}>
          <Anchor
            variant="text"
            href={`https://translate.google.com/?sl=en&tl=el&text=${item.from}&op=translate`}
            target="_blank"
            rel="noreferrer"
          >
            {item.from}
          </Anchor>
        </Title>
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

      <Code block style={{ marginBottom: 20 }}>
        <Text c="dimmed">Notes: </Text>
        <br />
        {item.notes || '...'}
      </Code>

      <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 'sm', sm: 'lg' }} justify="space-between">
        <Button
          onClick={showDeleteConfirmation ? remove : clickToConfirm}
          color={showDeleteConfirmation ? 'yellow' : 'blue'}
          variant="outline"
          leftIcon={showDeleteConfirmation ? <InfoIcon /> : <DeleteIcon />}
          size="xs"
          style={{ fontSize: '0.8rem' }}
        >
          <Text>{showDeleteConfirmation ? 'Click to confirm' : 'Delete'}</Text>
        </Button>
        <Button
          onClick={() =>
            openModal({
              title: <EditTransaltionHeader />,
              children: <TranslationForm item={item} />,
            })
          }
          color="green"
          variant="outline"
          leftIcon={<EditIcon />}
          size="xs"
          style={{ fontSize: '0.8rem' }}
        >
          <Text>Edit</Text>
        </Button>
      </Flex>
    </Card>
  )
}
