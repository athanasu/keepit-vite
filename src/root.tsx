import { ColorScheme, ColorSchemeProvider as ColorSchemeMantineProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App'
import { ColorSchemeProvider, ColorSchemeProviderProps } from './context/color-scheme-context'

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

  const colorChemeProviderValues: ColorSchemeProviderProps = { colorScheme, toggleColorScheme }

  return (
    <React.StrictMode>
      <ColorSchemeMantineProvider {...colorChemeProviderValues}>
        <ColorSchemeProvider {...colorChemeProviderValues}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <App />
          </MantineProvider>
        </ColorSchemeProvider>
      </ColorSchemeMantineProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />)
