import { ColorScheme, ColorSchemeProvider as ColorSchemeMantineProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider, openModal } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@total-typescript/ts-reset'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/components/app'
import { NewTransaltionHeader } from '~/components/modal-headers'
import { TranslationForm } from '~/components/translation/form'
import { ColorSchemeProvider, ColorSchemeProviderProps } from '~/context/color-scheme-context'
import { worker } from '~/mocks/browser'

// Create a react query client
const queryClient = new QueryClient()

// Use Mock Service Worker data when NODE_ENV is set to "msw"
function Root() {
  if (process.env.NODE_ENV === 'msw') {
    worker.start()
  }

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'))

  // Use Ctrl+J or Cmd+J to toggle color scheme
  // Use Ctrl+N to create a new translation
  useHotkeys([
    ['mod+J', () => toggleColorScheme()],
    [
      'ctrl+N',
      () =>
        openModal({
          title: <NewTransaltionHeader />,
          children: <TranslationForm />,
        }),
    ],
  ])

  const colorChemeProviderValues: ColorSchemeProviderProps = { colorScheme, toggleColorScheme }

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeMantineProvider {...colorChemeProviderValues}>
          <ColorSchemeProvider {...colorChemeProviderValues}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
              <ModalsProvider>
                <Notifications position="top-center" />
                <App />
              </ModalsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </ColorSchemeMantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />)
