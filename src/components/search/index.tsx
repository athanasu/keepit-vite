import { Select } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { openModal } from '@mantine/modals'
import { useSearchResults } from '~/hooks/useSearchResults'

import { TranslationForm } from '../translation/form'

export function Search() {
  const [query, setQuery] = useDebouncedState('', 200)
  const { selectData, setSelectData, searchResults } = useSearchResults(query)

  return (
    <Select
      placeholder="Search for translations..."
      data={selectData}
      searchable
      onSearchChange={(query) => setQuery(query)}
      onChange={(sid) =>
        openModal({
          title: 'Edit translation ✍️',
          children: <TranslationForm item={searchResults.find((i: any) => i.id === sid)} />,
        })
      }
      onDropdownClose={() => setSelectData([])}
      nothingFound="Nothing found..."
    />
  )
}
