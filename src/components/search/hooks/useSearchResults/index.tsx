import { SelectItem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { searchTranslation } from '~/api/translations'
import { ApiResponse, Translation } from '~/types'
import { ZodSearchTranslationData } from '~/zod-parsers'

export const useSearchResults = (query: string) => {
  const [selectedData, setSelectedData] = useState<SelectItem[]>([])
  const [searchResults, setSearchResults] = useState<Translation[]>([])

  useEffect(() => {
    const search = async () => {
      if (query.length > 1) {
        try {
          const { data, statusCode } = (await searchTranslation(query)) as ApiResponse

          if (statusCode === 404) {
            return
          }

          const parsedResults = ZodSearchTranslationData.parse(data)
          setSearchResults(parsedResults)

          const transformedResults: SelectItem[] = parsedResults.map((result: Translation) => {
            return {
              label: result.from,
              value: result.id,
            }
          })
          setSelectedData(transformedResults)
        } catch (error) {
          notifications.show({
            title: 'Error',
            message: JSON.stringify(error),
          })
        }
      }
    }
    search()
  }, [query])

  return { selectedData, setSelectedData, searchResults }
}
