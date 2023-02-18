import { Aside as AsideMantine, MediaQuery, Text } from '@mantine/core'

export function Aside() {
  return (
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <AsideMantine p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        <Text>Application sidebar</Text>
      </AsideMantine>
    </MediaQuery>
  )
}
