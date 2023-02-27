import { openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { SpotlightAction, closeSpotlight } from '@mantine/spotlight'
import { Dispatch, useEffect } from 'react'
import { searchTranslation } from '~/api/translations'
import { TranslationForm } from '~/components/translation/form'
import { ApiResponse, Translation } from '~/types'
import { ZodSearchTranslationData } from '~/zod-parsers'

interface SearchResultsProps {
  query: string
  setSearchActionResults: Dispatch<SpotlightAction[]>
}

export const useSearchResults = ({ query, setSearchActionResults }: SearchResultsProps) => {
  useEffect(() => {
    const search = async () => {
      if (query.length > 3) {
        try {
          const { data, statusCode } = (await searchTranslation(query)) as ApiResponse

          if (statusCode === 404) {
            return // The Spotlight component will show the "Nothing found" message
          }

          const parsedResult = ZodSearchTranslationData.parse(data)

          // This transformation needs to be done in order to show results as actions in the Spotlight component
          const actionResults = parsedResult.map((result: Translation) => {
            return {
              title: result.from,
              description: result.to,
              onTrigger: () => {
                openModal({
                  title: 'Edit translation ✍️',
                  children: <TranslationForm item={result} />,
                })
                closeSpotlight()
                setSearchActionResults([])
              },
            }
          })

          setSearchActionResults(actionResults)
        } catch (error) {
          showNotification({
            title: 'Error',
            message: JSON.stringify(error),
          })
        }
      }
    }
    search()
  }, [query])
}
