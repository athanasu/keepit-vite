import { ActionIcon, Badge, HoverCard, Kbd } from '@mantine/core'
import { InfoIcon } from '~/components/icons'

export function Shortcuts() {
  return (
    <HoverCard width={280} shadow="md" data-testid="shortcuts">
      <HoverCard.Target>
        <ActionIcon variant="outline" color="blue" w={35} h={35}>
          <InfoIcon />
        </ActionIcon>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Badge>Search</Badge> <Kbd>⌘</Kbd> + <Kbd>K</Kbd> <br />
        <br />
        <Badge>New entry</Badge> <Kbd>^</Kbd> + <Kbd>N</Kbd> <br />
        <br />
        <Badge>Dark / Light</Badge> <Kbd>^</Kbd> + <Kbd>J</Kbd> <br />
        <br />
        <Badge>Home</Badge> <Kbd>^</Kbd> + <Kbd>H</Kbd> <br />
        <br />
        <Badge>Flashcards</Badge> <Kbd>^</Kbd> + <Kbd>F</Kbd>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}
