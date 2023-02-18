import { Navbar as NavbarMantine, Text } from '@mantine/core'

export function Navbar({ opened }: { opened: boolean }) {
  return (
    <NavbarMantine p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Text>Application navbar</Text>
    </NavbarMantine>
  )
}
