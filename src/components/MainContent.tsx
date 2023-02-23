import { Badge, Button, Group, Loader, Modal, Pagination, SimpleGrid } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchTranslations } from '~/api/translations'
import { Translation } from '~/types/translation.types'

import { TranslationCard } from './TranslationCard'
import { TranslationForm } from './TranslationForm'

export function MainContent() {
  const [opened, setOpened] = useState(false)
  const [page, setPage] = useState(1)
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['translations', { page }],
    queryFn: async () => await fetchTranslations({ page, limit: 50 }),
    keepPreviousData: true,
  })

  return (
    <>
      {isLoading && <Loader variant="dots" />}

      {isSuccess && (
        <>
          <Group position="center">
            <Button onClick={() => setOpened(true)}>Add New</Button>
          </Group>
          <Badge color="green" variant="light">
            {data.total}
          </Badge>
          <Pagination total={data.totalPages} page={data.page} onChange={(e) => setPage(e)} />
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
            {data.data.map((item: Translation) => {
              return <TranslationCard item={item} key={item.id} />
            })}
          </SimpleGrid>
          <Modal opened={opened} onClose={() => setOpened(false)} title="New translation ✍️" closeOnClickOutside>
            <TranslationForm setOpened={setOpened} />
          </Modal>
        </>
      )}
    </>
  )
}
