import { SelectItem } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { searchTranslation } from '~/api/translations'
import { ApiResponse, Translation } from '~/types'
import { ZodSearchTranslationData } from '~/zod-parsers'

export const useSearchResults = (query: string) => {
  const [selectData, setSelectData] = useState<SelectItem[]>([])
  const [searchResults, setSearchResults] = useState<Translation[]>([])

  useEffect(() => {
    const search = async () => {
      if (query.length > 3) {
        try {
          const { data, statusCode } = (await searchTranslation(query)) as ApiResponse

          if (statusCode === 404) {
            return
          }

          const parsedResults = ZodSearchTranslationData.parse(data)
          setSearchResults(parsedResults)

          const transformedResults = parsedResults.map((result: Translation) => {
            return {
              label: result.from,
              value: result.id,
            }
          })
          setSelectData(transformedResults)
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

  return { selectData, setSelectData, searchResults }
}
