import { showNotification } from '@mantine/notifications'
import { useEffect } from 'react'
import { searchTranslation } from '~/api/translations'
import { ApiResponse, Translation } from '~/types'
import { ZodSearchTranslationData } from '~/zod-parsers'

export const useSelectSearchResults = ({ query, setSearchActionResults }: any) => {
  useEffect(() => {
    const search = async () => {
      if (query.length > 3) {
        try {
          const { data, statusCode } = (await searchTranslation(query)) as ApiResponse

          if (statusCode === 404) {
            return
          }

          const parsedResult = ZodSearchTranslationData.parse(data)

          const actionResults = parsedResult.map((result: Translation) => {
            return {
              label: result.from,
              value: result.to,
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
