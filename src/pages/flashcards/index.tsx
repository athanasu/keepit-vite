import { Blockquote, Box, Button, Center, Flex, Loader, Select, SimpleGrid, Text } from '@mantine/core'
import { closeAllModals, openModal } from '@mantine/modals'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchFlashCards } from '~/api/translations'
import { Flashcard } from '~/components/flashcard'
import { Progress } from '~/components/progress'
import { FlashcardsProvider, FlashcardsProviderProps } from '~/context/flashcards-context'
import { Translation } from '~/types'
import { ZodFlashCardsData } from '~/zod-parsers'

export const FlashcardsPage = () => {
  const queryClient = useQueryClient()
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [complete, setComplete] = useState(false)
  const [limit, setLimit] = useState('15')
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['flashcards', { limit }],
    queryFn: async () => await fetchFlashCards({ limit }),
    staleTime: 300000, // 5 minutes
  })

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

  const { data: flashcards } = ZodFlashCardsData.parse(data)

  return (
    <>
      {isLoading && (
        <Center style={{ height: '100%' }}>
          <Loader variant="dots" size={100} style={{ height: '100%' }} data-testid="loader" />
        </Center>
      )}

      {isSuccess && (
        <>
          <Flex align="end" justify="end">
            {!complete && (
              <Button
                onClick={() => {
                  setComplete(true)

                  openModal({
                    title: <Blockquote>Let's see how you did..</Blockquote>,
                    withCloseButton: false,
                    closeOnClickOutside: false,
                    centered: true,
                    children: (
                      <Flex direction="column" justify={'center'} align={'center'}>
                        <Progress correctAnswers={correctAnswers} length={flashcards.length} />
                        <br />
                        <Button
                          data-autofocus
                          sx={{ width: '100%' }}
                          onClick={async () => {
                            setComplete(false)
                            setCorrectAnswers(0)
                            closeAllModals()
                            await queryClient.invalidateQueries(['flashcards'])
                          }}
                        >
                          Restart
                        </Button>
                      </Flex>
                    ),
                  })
                }}
              >
                Complete
              </Button>
            )}
            <Select
              size="sm"
              style={{ width: 80 }}
              value={limit}
              onChange={setLimit}
              data={[
                { value: '15', label: '15' },
                { value: '25', label: '25' },
                { value: '50', label: '50' },
              ]}
              data-testid="flashcards-limit-select"
              sx={{ marginLeft: 20 }}
            />
          </Flex>
          <Box sx={{ marginTop: 40 }}>
            <SimpleGrid
              style={{ marginTop: 20, marginBottom: 20 }}
              cols={5}
              spacing="lg"
              breakpoints={[
                { maxWidth: 1450, cols: 3, spacing: 'md' },
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
          </Box>
        </>
      )}
    </>
  )
}
