import { AppShell } from '@mantine/core'
import { Header } from '~/components/header'
import { MainContent } from '~/components/main-content'

function App() {
  return (
    <AppShell header={<Header />} style={{ padding: '1rem' }}>
      <MainContent />
    </AppShell>
  )
}

export default App
