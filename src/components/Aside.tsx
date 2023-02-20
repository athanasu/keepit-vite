import { Aside as AsideMantine, Text } from '@mantine/core'

export function Aside({ opened }: { opened: boolean }) {
  return (
    <AsideMantine p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Text>https://mantine.dev/core/drawer/</Text>
    </AsideMantine>
  )
}
