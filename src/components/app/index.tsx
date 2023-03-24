import { AppShell } from '@mantine/core'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '~/components/header'
import { MainContent } from '~/components/main-content'

function App() {
  const hideRootContent = useLocation().pathname !== '/'

  return (
    <AppShell header={<Header />} style={{ padding: '1rem' }}>
      {!hideRootContent ? <MainContent /> : <Outlet />}
    </AppShell>
  )
}

export default App
