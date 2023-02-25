import { AppShell, Modal } from '@mantine/core'
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight'
import { useState } from 'react'
import '~/assets/css/app.css'
import { useDebouncedSearchResults } from '~/hooks'

import { Header } from '../header'
import { MainContent } from '../main-content'
import { TranslationForm } from '../translation/form'

function App() {
  const [query, setQuery] = useState('')
  const [searchActionResults, setSearchActionResults] = useState<SpotlightAction[]>([])

  const handleQueryChange = (query: string) => {
    setQuery(query)
  }

  useDebouncedSearchResults({ query, setSearchActionResults })

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
