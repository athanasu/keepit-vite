import { Button, Select } from '@mantine/core'
import { useDebouncedState, useHotkeys } from '@mantine/hooks'
import { openModal } from '@mantine/modals'
import { useRef } from 'react'
import { useSearchResults } from '~/components/search/hooks/useSearchResults'
import { TranslationForm } from '~/components/translation/form'

import { EditTransaltionHeader, NewTransaltionHeader } from '../modal-headers'

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
      nothingFound={
        query.length > 3 && (
          <Button
            style={{ width: '100%', background: 'none' }}
            onClick={() =>
              openModal({
                title: <NewTransaltionHeader />,
                children: <TranslationForm from={query} />,
              })
            }
          >
            Nothing found.. Keep it, maybe?
          </Button>
        )
      }
      ref={searchRef}
    />
  )
}
