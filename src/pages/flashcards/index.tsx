import { Center, Loader, SimpleGrid } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchFlashCards } from '~/api/translations'
import { Flashcard } from '~/components/flashcard'
import { Translation } from '~/types'
import { ZodFlashCardsData } from '~/zod-parsers'

export const FlashcardsPage = () => {
  const [limit, setLimit] = useState('15')
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['flashcards', { limit }],
    queryFn: async () => await fetchFlashCards({ limit }),
  })

  const { data: flashcards } = ZodFlashCardsData.parse(data)

  return (
    <>
      {isLoading && (
        <Center style={{ height: '100%' }}>
          <Loader variant="dots" size={100} style={{ height: '100%' }} />
        </Center>
      )}

      {isSuccess && (
        <>
          <SimpleGrid
            style={{ marginTop: 20, marginBottom: 20 }}
            cols={5}
            spacing="lg"
            breakpoints={[
              { maxWidth: 1450, cols: 4, spacing: 'md' },
              { maxWidth: 1200, cols: 3, spacing: 'sm' },
              { maxWidth: 880, cols: 2, spacing: 'sm' },
              { maxWidth: 450, cols: 1, spacing: 'sm' },
            ]}
          >
            {flashcards.map((item: Translation) => {
              return <Flashcard item={item} key={item.id} />
            })}
          </SimpleGrid>
        </>
      )}
    </>
  )
}
