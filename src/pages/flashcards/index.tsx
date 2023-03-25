import { Center, Loader, RingProgress, SimpleGrid, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchFlashCards } from '~/api/translations'
import { Flashcard } from '~/components/flashcard'
import { FlashcardsProvider, FlashcardsProviderProps } from '~/context/flashcards-context'
import { Translation } from '~/types'
import { ZodFlashCardsData } from '~/zod-parsers'

export const FlashcardsPage = () => {
  const [correctAnswers, setCorrectAnswers] = useState(0)
  console.log(correctAnswers)

  const setCorrectAnswersWrapper = (value: boolean) => {
    if (value) {
      setCorrectAnswers(correctAnswers + 1)
    } else {
      if (correctAnswers > 0) {
        setCorrectAnswers(correctAnswers - 1)
      }
    }
  }

  const flashcardsProviderValues: FlashcardsProviderProps = {
    correctAnswers,
    setCorrectAnswers: setCorrectAnswersWrapper,
  }

  const [limit, setLimit] = useState('15')
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['flashcards', { limit }],
    queryFn: async () => await fetchFlashCards({ limit }),
    staleTime: 300000, // 5 minutes
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
          <RingProgress
            sections={[{ value: Math.floor((correctAnswers / flashcards.length) * 100), color: 'blue' }]}
            label={
              <Text color="blue" weight={700} align="center" size="xl">
                {Math.floor((correctAnswers / flashcards.length) * 100)}%
              </Text>
            }
          />
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
            <FlashcardsProvider {...flashcardsProviderValues}>
              {flashcards.map((item: Translation) => {
                return <Flashcard item={item} key={item.id} />
              })}
            </FlashcardsProvider>
          </SimpleGrid>
        </>
      )}
    </>
  )
}
