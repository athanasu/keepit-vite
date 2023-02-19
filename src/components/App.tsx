import { AppShell } from '@mantine/core'
import { useState } from 'react'
import '~/assets/css/app.css'

import { Aside } from './Aside'
import { Header } from './Header'

function App() {
  const [opened, setOpened] = useState(false)

  return (
    <AppShell
      padding="md"
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
      header={<Header setOpened={setOpened} />}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={undefined}
      aside={<Aside opened={opened} />}
    >
      <></>
    </AppShell>
  )
}

export default App
