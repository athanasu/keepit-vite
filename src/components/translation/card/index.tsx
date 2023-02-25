import { Anchor, Badge, Button, Card, Divider, Flex, Group, Text, Title } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { removeTranslation } from '~/api/translations'
import { DeleteIcon, EditIcon, InfoIcon } from '~/components/icons'
import { Translation } from '~/types/translation.types'

import { TranslationForm } from '../form'

export function TranslationCard({ item }: { item: Translation }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const createdAt = new Date(item.createdAt)
  const queryClient = useQueryClient()

  const clickToConfirm = async () => {
    setShowDeleteConfirmation(true)
    setTimeout(() => {
      setShowDeleteConfirmation(false)
    }, 1000)
  }

  const remove = async () => {
    try {
      await removeTranslation(item.id)
      await queryClient.invalidateQueries(['translations'])
      showNotification({
        title: 'Information',
        message: 'Translation removed successfully',
      })
    } catch (error) {
      showNotification({
        title: 'Error',
        message: JSON.stringify(error),
      })
    }
  }

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

      <Button
        onClick={showDeleteConfirmation ? remove : clickToConfirm}
        color={showDeleteConfirmation ? 'yellow' : 'blue'}
        variant="outline"
        leftIcon={showDeleteConfirmation ? <InfoIcon /> : <DeleteIcon />}
      >
        <Text>{showDeleteConfirmation ? 'Click to confirm' : 'Delete'}</Text>
      </Button>
      <Button
        onClick={() =>
          openModal({
            title: 'Edit translation ✍️',
            children: <TranslationForm item={item} />,
          })
        }
        color="green"
        variant="outline"
        leftIcon={<EditIcon />}
      >
        <Text>Edit</Text>
      </Button>
      {item.notes && (
        <Text size="sm" color="dimmed">
          <Text c="dimmed">Notes: </Text>
          {item.notes}
        </Text>
      )}
    </Card>
  )
}
