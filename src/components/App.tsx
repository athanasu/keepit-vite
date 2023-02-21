import { AppShell } from '@mantine/core'
import '~/assets/css/app.css'

import { Header } from './Header'
import { MainContent } from './MainContent'

function App() {
  return (
    <AppShell
      padding="md"
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
      header={<Header setOpened={() => null} />}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={undefined}
      aside={undefined}
    >
      <MainContent />
    </AppShell>
  )
}

export default App
