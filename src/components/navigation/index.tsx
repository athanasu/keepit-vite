import { Box } from '@mantine/core'
import { Link } from 'react-router-dom'

import { FlashcardsIcon, HomeIcon } from '../icons'

export const Navigation = () => (
  <Box>
    <Link to="/">
      <HomeIcon />
    </Link>
    <Link to="/flashcards">
      <FlashcardsIcon />
    </Link>
  </Box>
)
