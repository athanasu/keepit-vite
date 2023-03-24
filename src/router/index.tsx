import { createBrowserRouter } from 'react-router-dom'
import App from '~/components/app'
import ErrorPage from '~/components/error'
import { FlashcardsPage } from '~/pages/flashcards'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'flashcards',
        element: <FlashcardsPage />,
      },
    ],
  },
])
