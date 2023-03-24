import { ActionIcon, Button, Flex, Group, Header as MantineHeader, MediaQuery, SimpleGrid } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { MoonIcon, PlusIcon, SunIcon } from '~/components/icons'
import { NewTransaltionHeader } from '~/components/modal-headers'
import { Search } from '~/components/search'
import { Shortcuts } from '~/components/shortcuts'
import { TranslationForm } from '~/components/translation/form'
import { ColorSchemeProviderProps, useColorScheme } from '~/context/color-scheme-context'

import { Navigation } from '../navigation'

export function Header() {
  const { colorScheme, toggleColorScheme } = useColorScheme() as ColorSchemeProviderProps
  const dark = colorScheme === 'dark'

  return (
    <MediaQuery query="(max-width: 750px)" styles={{ justifyContent: 'center' }}>
      <MediaQuery query="(max-width: 425px)" styles={{ display: 'flex', height: 200, maxHeight: 125 }}>
        <MantineHeader height={{ base: 70 }} p="md">
          <MediaQuery
            query="(max-width: 425px)"
            styles={{ display: 'flex', flexDirection: 'column-reverse', width: '100%' }}
          >
            <SimpleGrid cols={3} spacing="lg" data-testid="header">
              <Navigation />
              <Search />
              <MediaQuery query="(max-width: 425px)" styles={{ alignSelf: 'center' }}>
                <Flex align="center" justify="flex-end" direction="row">
                  <Group position="center">
                    <Button
                      size="xs"
                      style={{ fontSize: '1rem', lineHeight: 'normal' }}
                      onClick={() =>
                        openModal({
                          title: <NewTransaltionHeader />,
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
            </SimpleGrid>
          </MediaQuery>
        </MantineHeader>
      </MediaQuery>
    </MediaQuery>
  )
}
