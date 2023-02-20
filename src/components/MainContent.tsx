import { Badge, Loader, SimpleGrid } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { fetchTranslations } from '~/api/translations'
import { Translation } from '~/types/translation.types'

import { TranslationCard } from './Translation'

export function MainContent() {
  const { data, isLoading, isFetching } = useQuery(['translations'], fetchTranslations)

  return (
    <>
      {isLoading || isFetching ? (
        <Loader variant="dots" />
      ) : (
        <>
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
        </>
      )}
    </>
  )
}
