import { ColorSchemeProvider as ColorSchemeMantineProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { ColorSchemeProvider, ColorSchemeProviderProps } from '~/context/color-scheme-context'

interface RenderWithProvidersOptions {
  colorScheme?: ColorSchemeProviderProps['colorScheme']
}

export const renderWithProviders = (ui: React.ReactElement, options?: RenderWithProvidersOptions) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300000, // 5 minutes
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  })
  const colorScheme = options?.colorScheme ?? 'dark'
  const toggleColorScheme = vi.fn()
  const colorChemeProviderValues: ColorSchemeProviderProps = { colorScheme, toggleColorScheme }

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeMantineProvider {...colorChemeProviderValues}>
        <ColorSchemeProvider {...colorChemeProviderValues}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <ModalsProvider>{children}</ModalsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ColorSchemeMantineProvider>
    </QueryClientProvider>
  )

  const { rerender, ...result } = render(<Wrapper>{ui}</Wrapper>)

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) => rerender(<Wrapper>{rerenderUi}</Wrapper>),
  }
}
