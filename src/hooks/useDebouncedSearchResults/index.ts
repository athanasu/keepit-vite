import { closeSpotlight } from '@mantine/spotlight'
import { useEffect } from 'react'
import { searchTranslation } from '~/api/translations'
import { Translation } from '~/types/translation.types'
import { ZodSearchTranslationData } from '~/zod-parsers'

export const useDebouncedSearchResults = ({ query, setSelectedItem, setShowEditForm, setSearchResults }: any) => {
  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (query.length > 3) {
        const results = await searchTranslation(query)
        const parsedResults = ZodSearchTranslationData.parse(results)

        if (parsedResults.length) {
          const actionResults = parsedResults.map((result: Translation) => {
            return {
              title: result.from,
              description: result.to,
              onTrigger: () => {
                setSelectedItem(result)
                setShowEditForm(true)
                closeSpotlight()
                setSearchResults([])
              },
            }
          })
          setSearchResults(actionResults)
        }
      }
    }, 500)

    return () => {
      clearTimeout(debounceTimeout)
    }
  }, [query])
}
