import { ColorSchemeProvider as ColorSchemeMantineProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { ColorSchemeProvider, ColorSchemeProviderProps } from '~/context/color-scheme-context'

export interface RenderWithProvidersOptions {
  route?: string
  colorScheme?: ColorSchemeProviderProps['colorScheme']
  toggleColorScheme?: ColorSchemeProviderProps['toggleColorScheme']
}

export const renderWithProviders = (ui: React.ReactElement, options: RenderWithProvidersOptions = { route: '/' }) => {
  window.history.pushState({}, 'Test page', options.route)
  const colorScheme = options?.colorScheme ?? 'dark'
  const toggleColorScheme = options?.toggleColorScheme ?? vi.fn()
  const colorChemeProviderValues: ColorSchemeProviderProps = { colorScheme, toggleColorScheme }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  })

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ColorSchemeMantineProvider {...colorChemeProviderValues}>
            <ColorSchemeProvider {...colorChemeProviderValues}>
              <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <ModalsProvider>{children}</ModalsProvider>
              </MantineProvider>
            </ColorSchemeProvider>
          </ColorSchemeMantineProvider>
        </QueryClientProvider>
      </BrowserRouter>
    )
  }

  const { rerender, ...result } = render(ui, { wrapper: Wrapper, ...options })

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) => rerender(<Wrapper {...options}>{rerenderUi}</Wrapper>),
    queryClient,
  }
}
