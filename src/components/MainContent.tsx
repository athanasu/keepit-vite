import { useQuery } from '@tanstack/react-query'
import { fetchTranslations } from '~/api/translations'

export function MainContent() {
  const { data, isLoading, isSuccess, isError, isFetching, fetchStatus } = useQuery(['translations'], fetchTranslations)

  console.log('data', data)
  console.log('isLoading', isLoading)
  console.log('isSuccess', isSuccess)
  console.log('isError', isError)
  console.log('isFetching', isFetching)
  console.log('fetchStatus', fetchStatus)

  return <>{JSON.stringify(data)}</>
}
