import { Accordion, Anchor, Box, Checkbox, Divider, Flex } from '@mantine/core'
import { useState } from 'react'
import { FlashcardsProviderProps, useFlashcards } from '~/context/flashcards-context'
import { Translation } from '~/types'

export const Flashcard = ({ item }: { item: Translation }) => {
  const [checked, setChecked] = useState(false)
  const { setCorrectAnswers } = useFlashcards() as FlashcardsProviderProps

  return (
    <Flex justify={'center'} align={'center'}>
      <Box w={'80%'} h={200} pos={'relative'} data-testid="flashcard">
        <Checkbox
          checked={checked}
          onChange={(event) => {
            setChecked(event.currentTarget.checked)
            setCorrectAnswers(event.currentTarget.checked)
          }}
          sx={{ position: 'absolute', top: '14px', '&:hover': { cursor: 'pointer' } }}
          data-testid={`flashcard-checkbox-${item.id}`}
        />
        <Accordion sx={{ marginLeft: '30px' }}>
          <Accordion.Item value={item.to}>
            <Accordion.Control>{item.from}</Accordion.Control>
            <Accordion.Panel>
              <Divider
                my="xl"
                label={
                  <Anchor
                    variant="text"
                    href={`https://translate.google.com/?sl=en&tl=el&text=${item.from}&op=translate`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.to}
                  </Anchor>
                }
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
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Box>
    </Flex>
  )
}
