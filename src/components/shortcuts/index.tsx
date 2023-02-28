import { ActionIcon, Badge, Button, Flex, HoverCard, Kbd } from '@mantine/core'

import { InfoIcon } from '../icons'

export function Shortcuts() {
  return (
    <HoverCard width={280} shadow="md">
      <HoverCard.Target>
        <ActionIcon variant="outline" color="blue">
          <InfoIcon />
        </ActionIcon>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Badge>Search</Badge> <Kbd>⌘</Kbd> + <Kbd>K</Kbd> <br />
        <br />
        <Badge>New entry</Badge> <Kbd>^</Kbd> + <Kbd>N</Kbd> <br />
        <br />
        <Badge>Dark / Light</Badge> <Kbd>⌘</Kbd> + <Kbd>J</Kbd>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}
