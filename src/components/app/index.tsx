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
  const [searchResults, setSearchResults] = useState<SpotlightAction[]>([])

  const [showEditForm, setShowEditForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleQueryChange = (query: string) => {
    setQuery(query)
  }

  useDebouncedSearchResults({
    query,
    setSelectedItem,
    setShowEditForm,
    setSearchResults,
  })

  return (
    <SpotlightProvider
      searchInputProps={{ autoComplete: 'off' }}
      actions={searchResults}
      searchPlaceholder="Search for translations..."
      shortcut={['mod + K', 'mod + P']}
      nothingFoundMessage="Nothing found"
      cleanQueryOnClose
      closeOnActionTrigger
      onSpotlightOpen={() => {
        setSearchResults([])
      }}
      onQueryChange={handleQueryChange}
    >
      <AppShell header={<Header />}>
        <MainContent />
      </AppShell>
      <Modal opened={showEditForm} onClose={() => setShowEditForm(false)} title="Search result ✍️" closeOnClickOutside>
        <TranslationForm setOpened={setShowEditForm} item={selectedItem} />
      </Modal>
    </SpotlightProvider>
  )
}

export default App
