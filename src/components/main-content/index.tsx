import { Badge, Button, Group, Loader, Pagination, SimpleGrid } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchTranslations } from '~/api/translations'
import { PlusIcon } from '~/components/icons'
import { Translation } from '~/types/translation.types'
import { ZodTranslationData } from '~/zod-parsers'

import { TranslationCard } from '../translation/card'
import { TranslationForm } from '../translation/form'

export function MainContent() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['translations', { page }],
    queryFn: async () => await fetchTranslations({ page, limit: 50 }),
    keepPreviousData: true,
  })

  const parsedData = ZodTranslationData.parse(data)

  return (
    <>
      {isLoading && <Loader variant="dots" />}

      {isSuccess && (
        <>
          <Group position="center">
            <Button
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
          </Group>
          <Badge color="green" variant="light">
            {parsedData.total}
          </Badge>
          <Pagination total={parsedData.totalPages} page={parsedData.currentPage} onChange={(e) => setPage(e)} />
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
            {parsedData.data.map((item: Translation) => {
              return <TranslationCard item={item} key={item.id} />
            })}
          </SimpleGrid>
        </>
      )}
    </>
  )
}
