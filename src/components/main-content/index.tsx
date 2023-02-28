import { Badge, Box, Center, Flex, Loader, MediaQuery, Pagination, Select, SimpleGrid } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchTranslations } from '~/api/translations'
import { TranslationCard } from '~/components/translation/card'
import { Translation } from '~/types'
import { ZodReadTranslationData } from '~/zod-parsers'

export function MainContent() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('50')
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['translations', { page, limit }],
    queryFn: async () => await fetchTranslations({ page, limit }),
    keepPreviousData: true,
  })

  const { total, totalPages, currentPage, data: translations } = ZodReadTranslationData.parse(data)

  const TopArea = () => (
    <MediaQuery query="(max-width: 750px)" styles={{ flexDirection: 'column', alignItems: 'center' }}>
      <Flex justify="space-between" align="center">
        <MediaQuery query="(max-width: 750px)" styles={{ marginBottom: 20 }}>
          <Badge color="green" variant="light">
            Total: {total}
          </Badge>
        </MediaQuery>
        <Box style={{ display: 'inline-flex' }}>
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={(e) => setPage(e)}
            withEdges
            style={{ marginRight: 20 }}
          />
          <Select
            size="sm"
            style={{ width: 80 }}
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
        </Box>
      </Flex>
    </MediaQuery>
  )

  return (
    <>
      {isLoading && (
        <Center style={{ height: '100%' }}>
          <Loader variant="dots" size={100} style={{ height: '100%' }} />
        </Center>
      )}

      {isSuccess && (
        <>
          <TopArea />
          <SimpleGrid
            style={{ marginTop: 20, marginBottom: 20 }}
            cols={5}
            spacing="lg"
            breakpoints={[
              { maxWidth: 1450, cols: 4, spacing: 'md' },
              { maxWidth: 1200, cols: 3, spacing: 'sm' },
              { maxWidth: 880, cols: 2, spacing: 'sm' },
              { maxWidth: 450, cols: 1, spacing: 'sm' },
            ]}
          >
            {translations.map((item: Translation) => {
              return <TranslationCard item={item} key={item.id} />
            })}
          </SimpleGrid>
        </>
      )}
    </>
  )
}
