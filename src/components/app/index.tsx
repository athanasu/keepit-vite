import { AppShell } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight'
import { useState } from 'react'
import '~/assets/css/app.css'
import { Header } from '~/components/header'
import { MainContent } from '~/components/main-content'
import { useSearchResults } from '~/hooks'

function App() {
  const [query, setQuery] = useDebouncedState('', 200)
  const [searchActionResults, setSearchActionResults] = useState<SpotlightAction[]>([])

  const handleQueryChange = (query: string) => setQuery(query)

  useSearchResults({ query, setSearchActionResults })

  return (
    <SpotlightProvider
      searchInputProps={{ autoComplete: 'off' }}
      actions={searchActionResults}
      searchPlaceholder="Search for translations..."
      shortcut={['mod + K', 'mod + P']}
      nothingFoundMessage="Nothing found"
      cleanQueryOnClose
      closeOnActionTrigger
      onSpotlightOpen={() => {
        setSearchActionResults([])
      }}
      onQueryChange={handleQueryChange}
    >
      <AppShell header={<Header />}>
        <MainContent />
      </AppShell>
    </SpotlightProvider>
  )
}

export default App
