import { Badge, Button, Group, Loader, Pagination, Select, SimpleGrid } from '@mantine/core'
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
  const [limit, setLimit] = useState('50')
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['translations', { page, limit }],
    queryFn: async () => await fetchTranslations({ page, limit }),
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
          <Group position="right">
            <Pagination total={parsedData.totalPages} page={parsedData.currentPage} onChange={(e) => setPage(e)} />
            <Select
              value={limit}
              onChange={setLimit}
              data={[
                { value: '25', label: '25' },
                { value: '50', label: '50' },
                { value: '100', label: '100' },
                { value: '150', label: '150' },
                { value: '200', label: '200' },
              ]}
            />
          </Group>
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
