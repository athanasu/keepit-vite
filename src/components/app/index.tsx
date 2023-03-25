import { AppShell } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Header } from '~/components/header'
import { MainContent } from '~/components/main-content'

function App() {
  const navigate = useNavigate()
  useHotkeys([
    ['ctrl+H', () => navigate('/')],
    ['ctrl+F', () => navigate('/flashcards')],
  ])

  const hideRootContent = useLocation().pathname !== '/'

  return (
    <AppShell header={<Header />} style={{ padding: '1rem' }}>
      {!hideRootContent ? <MainContent /> : <Outlet />}
    </AppShell>
  )
}

export default App
