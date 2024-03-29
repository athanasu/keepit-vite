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
  const { selectedData, setSelectedData, searchResults } = useSearchResults(query)

  useHotkeys([['mod+K', () => searchRef.current?.focus()]])

  return (
    <Select
      rightSection={<></>}
      placeholder="Looking for something?"
      data={selectedData}
      searchable
      onSearchChange={(query) => setQuery(query)}
      onChange={(sid) =>
        openModal({
          title: <EditTransaltionHeader />,
          children: <TranslationForm item={searchResults.find((i: any) => i.id === sid)} />,
        })
      }
      onDropdownClose={() => setSelectedData([])}
      nothingFound={
        query.length > 1 && (
          <Button
            data-testid="nothing-found"
            style={{ width: '100%', background: 'none', minWidth: '100px' }}
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
