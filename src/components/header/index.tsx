import { ActionIcon, Button, Flex, Grid, Group, Header as MantineHeader, MediaQuery, SimpleGrid } from '@mantine/core'
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
    <MediaQuery query="(max-width: 798px)" styles={{ display: 'flex', justifyContent: 'center' }}>
      <MantineHeader height={{ base: 70 }} p="md">
        <MediaQuery
          query="(max-width: 425px)"
          styles={{ display: 'flex', flexDirection: 'column-reverse', width: '100%' }}
        >
          <>
            <Grid data-testid="header">
              <Grid.Col span={'content'}>
                <Navigation />
              </Grid.Col>
              <Grid.Col span={'auto'}>
                <Search />
              </Grid.Col>
              <Grid.Col span={'content'}>
                <MediaQuery query="(max-width: 425px)" styles={{ alignSelf: 'center' }}>
                  <Flex align="center" justify="flex-end" direction="row">
                    <Group position="center">
                      <Button
                        style={{ fontSize: '1rem', lineHeight: 'normal' }}
                        onClick={() =>
                          openModal({
                            title: <NewTransaltionHeader />,
                            children: <TranslationForm />,
                          })
                        }
                      >
                        <PlusIcon />
                        &nbsp;New
                      </Button>
                      <ActionIcon
                        w={35}
                        h={35}
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
              </Grid.Col>
            </Grid>
          </>
        </MediaQuery>
      </MantineHeader>
    </MediaQuery>
  )
}
