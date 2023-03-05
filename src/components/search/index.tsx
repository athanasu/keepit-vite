import { Select } from '@mantine/core'
import { useDebouncedState, useHotkeys } from '@mantine/hooks'
import { openModal } from '@mantine/modals'
import { useRef } from 'react'
import { TranslationForm } from '~/components/translation/form'
import { useSearchResults } from '~/hooks/useSearchResults'

import { EditTransaltionHeader } from '../modal-headers'

export function Search() {
  const searchRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useDebouncedState('', 200)
  const { selectData, setSelectData, searchResults } = useSearchResults(query)

  useHotkeys([['mod+K', () => searchRef.current?.focus()]])

  return (
    <Select
      rightSection={<></>}
      placeholder="Looking for something?"
      data={selectData}
      searchable
      onSearchChange={(query) => setQuery(query)}
      onChange={(sid) =>
        openModal({
          title: <EditTransaltionHeader />,
          children: <TranslationForm item={searchResults.find((i: any) => i.id === sid)} />,
        })
      }
      onDropdownClose={() => setSelectData([])}
      nothingFound="Nothing found..."
      ref={searchRef}
    />
  )
}
