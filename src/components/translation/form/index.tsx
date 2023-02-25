import { Box, Button, Group, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { closeAllModals } from '@mantine/modals'
import { useQueryClient } from '@tanstack/react-query'
import { addTranslation, updateTranslation } from '~/api/translations'

export function TranslationForm({ item = null }: any) {
  const queryClient = useQueryClient()
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

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit(async (values) => {
          item ? await updateTranslation(item.id, values) : await addTranslation(values)
          await queryClient.invalidateQueries(['translations'])
          closeAllModals()
        })}
      >
        <TextInput withAsterisk label="Original" placeholder="" {...form.getInputProps('from')} disabled={!!item} />
        <TextInput withAsterisk label="Translation" placeholder="" {...form.getInputProps('to')} />
        <Textarea placeholder="Additional information..." label="Notes" {...form.getInputProps('notes')} />

        <Group position="right" mt="md">
          <Button type="submit">{item ? 'Update' : 'Submit'}</Button>
        </Group>
      </form>
    </Box>
  )
}
