import { ColorSchemeProvider as ColorSchemeMantineProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { ColorSchemeProvider, ColorSchemeProviderProps } from '~/context/color-scheme-context'

interface RenderWithProvidersOptions {
  colorScheme?: ColorSchemeProviderProps['colorScheme']
}

export const renderWithProviders = (ui: any, options?: RenderWithProvidersOptions) => {
  const queryClient = new QueryClient()
  const colorScheme = options?.colorScheme ?? 'dark'
  const toggleColorScheme = vi.fn()
  const colorChemeProviderValues: ColorSchemeProviderProps = { colorScheme, toggleColorScheme }

  return render(
    <QueryClientProvider client={queryClient}>
      <ColorSchemeMantineProvider {...colorChemeProviderValues}>
        <ColorSchemeProvider {...colorChemeProviderValues}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <ModalsProvider>{ui}</ModalsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ColorSchemeMantineProvider>
    </QueryClientProvider>,
  )
}
