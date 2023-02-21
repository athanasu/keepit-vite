import { Anchor, Badge, Button, Card, Divider, Flex, Group, Modal, Text, Title } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { removeTranslation } from '~/api/translations'
import { Translation } from '~/types/translation.types'

import { TranslationForm } from './TranslationForm'

export function TranslationCard({ item }: { item: Translation }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
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
    } catch (error) {
      console.error(error)
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
        leftIcon={
          showDeleteConfirmation ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-info-circle"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
              <path d="M12 8l.01 0"></path>
              <path d="M11 12l1 0l0 4l1 0"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-trash"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 7l16 0"></path>
              <path d="M10 11l0 6"></path>
              <path d="M14 11l0 6"></path>
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
            </svg>
          )
        }
      >
        <Text>{showDeleteConfirmation ? 'Click to confirm' : 'Delete'}</Text>
      </Button>
      <Button
        onClick={() => setShowEditForm(true)}
        color="green"
        variant="outline"
        leftIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-pencil"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
            <path d="M13.5 6.5l4 4"></path>
          </svg>
        }
      >
        <Text>Edit</Text>
      </Button>
      {item.notes && (
        <Text size="sm" color="dimmed">
          <Text c="dimmed">Notes: </Text>
          {item.notes}
        </Text>
      )}
      <Modal
        opened={showEditForm}
        onClose={() => setShowEditForm(false)}
        title="Edit translation ✍️"
        closeOnClickOutside
      >
        <TranslationForm setOpened={setShowEditForm} item={item} />
      </Modal>
    </Card>
  )
}
