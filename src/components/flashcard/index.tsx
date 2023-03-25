import { Accordion, Box, Button, Checkbox, Collapse, Group, Text } from '@mantine/core'
import { useState } from 'react'
import { useFlashcards } from '~/context/flashcards-context'
import { Translation } from '~/types'

export const Flashcard = ({ item }: { item: Translation }) => {
  const [checked, setChecked] = useState(false)
  const { setCorrectAnswers } = useFlashcards()

  return (
    <Box sx={{ width: '300px', height: '200px', position: 'relative' }} data-testid="flashcard">
      <Checkbox
        checked={checked}
        onChange={(event) => {
          setChecked(event.currentTarget.checked)
          setCorrectAnswers(event.currentTarget.checked)
        }}
        sx={{ position: 'absolute', top: '14px', '&:hover': { cursor: 'pointer' } }}
      />
      <Accordion sx={{ marginLeft: '30px' }}>
        <Accordion.Item value={item.to}>
          <Accordion.Control>{item.from}</Accordion.Control>
          <Accordion.Panel>
            <Text>{item.to}</Text>
            <Text>Notes</Text>
            {item.notes ? <Text>{item.notes}</Text> : '...'}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  )
}
