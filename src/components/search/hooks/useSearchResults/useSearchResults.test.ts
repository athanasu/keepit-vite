import { renderHook } from '@testing-library/react-hooks'

import { useSearchResults } from '.'

it('should call useSearchResults and return default results', async () => {
  const { result } = renderHook(() => useSearchResults('test'))

  expect(result.current).toEqual({
    selectedData: [],
    setSelectedData: expect.any(Function),
    searchResults: [],
  })
})
