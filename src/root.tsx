import { ColorScheme, ColorSchemeProvider as ColorSchemeMantineProvider, MantineProvider, Modal } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { SpotlightAction, SpotlightProvider, closeSpotlight } from '@mantine/spotlight'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import { searchTranslation } from './api/translations'
import App from './components/App'
import { TranslationForm } from './components/TranslationForm'
import { ColorSchemeProvider, ColorSchemeProviderProps } from './context/color-scheme-context'

// Create a client
const queryClient = new QueryClient()

function Root() {
  const [searchResults, setSearchResults] = useState<SpotlightAction[]>([])
  const [showEditForm, setShowEditForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'))

  // Use Ctrl+J or Cmd+J to toggle color scheme
  useHotkeys([['mod+J', () => toggleColorScheme()]])

  const colorChemeProviderValues: ColorSchemeProviderProps = { colorScheme, toggleColorScheme }

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeMantineProvider {...colorChemeProviderValues}>
          <ColorSchemeProvider {...colorChemeProviderValues}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
              <SpotlightProvider
                searchInputProps={{ autoComplete: 'off' }}
                actions={searchResults}
                searchIcon={undefined}
                searchPlaceholder="Search..."
                shortcut={['mod + K', 'mod + P']}
                nothingFoundMessage="Nothing found..."
                cleanQueryOnClose
                closeOnActionTrigger
                onSpotlightOpen={() => {
                  setSearchResults([])
                }}
                onQueryChange={async (query) => {
                  if (query.length > 3) {
                    const results = await searchTranslation(query)
                    if (results.length) {
                      const actionResults = results.map((result: any) => {
                        return {
                          title: result.from,
                          description: result.to,
                          onTrigger: () => {
                            setSelectedItem(result)
                            setShowEditForm(true)
                            closeSpotlight()
                            setSearchResults([])
                          },
                        }
                      })
                      setSearchResults(actionResults)
                    }
                  }
                }}
              >
                <App />
              </SpotlightProvider>
              <Modal
                opened={showEditForm}
                onClose={() => setShowEditForm(false)}
                title="Search result ✍️"
                closeOnClickOutside
              >
                <TranslationForm setOpened={setShowEditForm} item={selectedItem} />
              </Modal>
            </MantineProvider>
          </ColorSchemeProvider>
        </ColorSchemeMantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />)
