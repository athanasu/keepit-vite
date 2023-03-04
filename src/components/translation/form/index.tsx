import { Box, Button, Group, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useFocusTrap } from '@mantine/hooks'
import { closeAllModals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { addTranslation, updateTranslation } from '~/api/translations'
import { CreateApiResponse, Translation, UpdateApiResponse } from '~/types'

export function TranslationForm({ item }: { item?: Translation }) {
  const queryClient = useQueryClient()
  const fromInputRef = useFocusTrap()
  const toInputRef = useFocusTrap()
  const form = useForm({
    initialValues: {
      from: item?.from ?? '',
      to: item?.to ?? '',
      notes: item?.notes ?? '',
    },
    validate: {
      from: (value) => (value.length < 2 ? 'Must have at least 2 letters' : null),
      to: (value) => (value.length < 2 ? 'Must have at least 2 letters' : null),
    },
  })

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const { data } = item
        ? ((await updateTranslation(item.id, values)) as UpdateApiResponse)
        : ((await addTranslation(values)) as CreateApiResponse)
      await queryClient.invalidateQueries(['translations'])

      closeAllModals()
      notifications.show({
        title: 'Information',
        message: `"${data.from}" ${item ? 'updated' : 'stored'} successfully`,
      })
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: JSON.stringify(error),
      })
    }
  })

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={handleSubmit}>
        <TextInput
          ref={fromInputRef}
          withAsterisk
          label="Original"
          placeholder=""
          {...form.getInputProps('from')}
          disabled={!!item}
          data-autofocus={!!item}
          autoComplete="off"
        />
        <TextInput
          ref={toInputRef}
          withAsterisk
          label="Translation"
          placeholder=""
          {...form.getInputProps('to')}
          data-autofocus={!item}
          autoComplete="off"
        />
        <Textarea placeholder="Additional information..." label="Notes" {...form.getInputProps('notes')} />

        <Group position="right" mt="md">
          <Button type="submit">{item ? 'Update' : 'Submit'}</Button>
        </Group>
      </form>
    </Box>
  )
}
