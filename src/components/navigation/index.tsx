import { Box, Flex } from '@mantine/core'
import { Link } from 'react-router-dom'

import { FlashcardsIcon, HomeIcon } from '../icons'

export const Navigation = () => (
  <Flex align="center" justify="flex-start" direction="row" data-testid="aaaa">
    <Box sx={{ paddingTop: 10, marginRight: 10 }}>
      <Link to="/">
        <HomeIcon />
      </Link>
    </Box>
    <Box sx={{ paddingTop: 10 }}>
      <Link to="/flashcards">
        <FlashcardsIcon />
      </Link>
    </Box>
  </Flex>
)
