import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App'

function Root() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'))

  // Use Ctrl+J or Cmd+J to toggle color scheme
  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <React.StrictMode>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <App colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />
        </MantineProvider>
      </ColorSchemeProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />)
