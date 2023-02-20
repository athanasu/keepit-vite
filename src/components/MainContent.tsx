import { Badge, Button, Drawer, Group, Loader, SimpleGrid, useMantineTheme } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchTranslations } from '~/api/translations'
import { Translation } from '~/types/translation.types'

import { AddTranslationForm } from './AddTranslationForm'
import { TranslationCard } from './TranslationCard'

export function MainContent() {
  const { data, isLoading, isFetching } = useQuery(['translations'], fetchTranslations)
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  return (
    <>
      {isLoading || isFetching ? (
        <Loader variant="dots" />
      ) : (
        <>
          <Group position="center">
            <Button onClick={() => setOpened(true)}>Add New</Button>
          </Group>
          <Badge color="green" variant="light">
            {data?.length}
          </Badge>
          <SimpleGrid
            cols={5}
            spacing="lg"
            breakpoints={[
              { maxWidth: 1450, cols: 4, spacing: 'md' },
              { maxWidth: 1200, cols: 3, spacing: 'sm' },
              { maxWidth: 880, cols: 2, spacing: 'sm' },
              { maxWidth: 450, cols: 1, spacing: 'sm' },
            ]}
          >
            {data?.map((item: Translation) => {
              return <TranslationCard item={item} key={item.id} />
            })}
          </SimpleGrid>
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            position="right"
            size="xl"
          >
            <AddTranslationForm />
          </Drawer>
        </>
      )}
    </>
  )
}
