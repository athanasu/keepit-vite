import { closeAllModals, openModal } from '@mantine/modals'
import { closeSpotlight } from '@mantine/spotlight'
import { useEffect } from 'react'
import { searchTranslation } from '~/api/translations'
import { TranslationForm } from '~/components/translation/form'
import { Translation } from '~/types/translation.types'
import { ZodSearchTranslationData } from '~/zod-parsers'

export const useDebouncedSearchResults = ({ query, setSearchActionResults }: any) => {
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
                openModal({
                  title: 'Subscribe to newsletter',
                  children: <TranslationForm item={result} />,
                })
                closeSpotlight()
                setSearchActionResults([])
              },
            }
          })
          setSearchActionResults(actionResults)
        }
      }
    }, 500)

    return () => {
      clearTimeout(debounceTimeout)
    }
  }, [query])
}
