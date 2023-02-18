import { AppShell } from '@mantine/core'
import { useState } from 'react'
import '~/assets/css/app.css'

import { Aside } from './Aside'
import { Header } from './Header'
import { Navbar } from './Navbar'

function App({ colorScheme, toggleColorScheme }: any) {
  const [opened, setOpened] = useState(false)
  return (
    <AppShell
      padding="md"
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
      header={<Header colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} setOpened={setOpened} />}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<Navbar opened={opened} />}
      aside={<Aside />}
    >
      <></>
    </AppShell>
  )
}

export default App
