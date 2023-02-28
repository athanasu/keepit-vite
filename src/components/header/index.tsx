import { ActionIcon, Button, Flex, Group, Header as MantineHeader, MediaQuery } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { MoonIcon, PlusIcon, SunIcon } from '~/components/icons'
import { Shortcuts } from '~/components/shortcuts'
import { TranslationForm } from '~/components/translation/form'
import { ColorSchemeProviderProps, useColorScheme } from '~/context/color-scheme-context'

export function Header() {
  const { colorScheme, toggleColorScheme } = useColorScheme() as ColorSchemeProviderProps
  const dark = colorScheme === 'dark'

  return (
    <MantineHeader height={{ base: 70 }} p="md">
      <MediaQuery query="(max-width: 750px)" styles={{ justifyContent: 'center' }}>
        <Flex align="center" justify="flex-end" direction="row">
          <Group position="center">
            <Button
              size="xs"
              style={{ fontSize: '1rem', lineHeight: 'normal' }}
              onClick={() =>
                openModal({
                  title: 'New translation ✍️',
                  children: <TranslationForm />,
                })
              }
            >
              <PlusIcon />
              &nbsp; New
            </Button>
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <MoonIcon /> : <SunIcon />}
            </ActionIcon>
            <Shortcuts />
          </Group>
        </Flex>
      </MediaQuery>
    </MantineHeader>
  )
}
