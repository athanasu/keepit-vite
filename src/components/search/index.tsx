import { Select, SelectItem } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { searchTranslation } from '~/api/translations'
import { useSelectSearchResults } from '~/hooks'
import { ApiResponse, Translation } from '~/types'
import { ZodSearchTranslationData } from '~/zod-parsers'

import { TranslationForm } from '../translation/form'

export function Search() {
  const emptyResults = [{ value: '', label: 'Nothing found...' }]
  const [query, setQuery] = useDebouncedState('', 200)
  const [searchActionResults, setSearchActionResults] = useState<SelectItem[]>([])
  const [items, setItems] = useState(null) as any

  const search = async (query: string) => {
    if (query.length > 3) {
      try {
        const { data, statusCode } = (await searchTranslation(query)) as ApiResponse

        if (statusCode === 404) {
          return
        }

        const parsedResult = ZodSearchTranslationData.parse(data)
        setItems(parsedResult)
        const actionResults = parsedResult.map((result: Translation) => {
          return {
            label: result.from,
            value: result.id,
          }
        })

        setSearchActionResults(actionResults as any)
      } catch (error) {
        showNotification({
          title: 'Error',
          message: JSON.stringify(error),
        })
      }
    }
  }

  const handleQueryChange = (query: string) => {
    setQuery(query)
  }

  useEffect(() => {
    search(query)
  }, [query])

  console.log(searchActionResults)
  return (
    <Select
      placeholder="Search for translations..."
      onChange={(sid) =>
        openModal({
          title: 'Edit translation ✍️',
          children: <TranslationForm item={items.find((i: any) => i.id === sid)} />,
        })
      }
      onSearchChange={(e) => handleQueryChange(e)}
      searchable
      data={searchActionResults}
      onDropdownClose={() => {
        setSearchActionResults(emptyResults)
      }}
    />
  )
}
