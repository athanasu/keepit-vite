import { ActionIcon, Header as MantineHeader } from '@mantine/core'
import { ColorSchemeProviderProps, useColorScheme } from '~/context/color-scheme-context'

import { MoonIcon, SunIcon } from '../icons'

export function Header() {
  const { colorScheme, toggleColorScheme } = useColorScheme() as ColorSchemeProviderProps
  const dark = colorScheme === 'dark'

  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md" className="header">
      <ActionIcon
        variant="outline"
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <MoonIcon /> : <SunIcon />}
      </ActionIcon>
    </MantineHeader>
  )
}
