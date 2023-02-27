import { openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { closeSpotlight } from '@mantine/spotlight'
import { useEffect } from 'react'
import { searchTranslation } from '~/api/translations'
import { TranslationForm } from '~/components/translation/form'
import { Translation } from '~/types/translation.types'
import { ZodSearchTranslationData } from '~/zod-parsers'

export const useSearchResults = ({ query, setSearchActionResults }: any) => {
  useEffect(() => {
    const search = async () => {
      let results: any = []
      if (query.length > 3) {
        try {
          results = await searchTranslation(query)

          if (!Array.isArray(results) && results?.statusCode === 404) {
            return
          }

          const parsedResults = ZodSearchTranslationData.parse(results)

          if (parsedResults.length) {
            const actionResults = parsedResults.map((result: Translation) => {
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
          }
        } catch (error) {
          console.log(error)
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
