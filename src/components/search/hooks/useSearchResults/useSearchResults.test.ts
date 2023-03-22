import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { rest } from 'msw'
import { vi } from 'vitest'
import * as translations from '~/api/translations'
import { getUrl } from '~/helpers/get-url'
import { server } from '~/mocks/server'

import { useSearchResults } from '.'

it('should call useSearchResults and return default results', async () => {
  const { result } = renderHook(() => useSearchResults('test'))

  expect(result.current).toEqual({
    selectedData: [],
    setSelectedData: expect.any(Function),
    searchResults: [],
  })
})

it('should call useSearchResults and return statusCode 404', async () => {
  server.use(
    rest.get(getUrl('/.netlify/functions/search'), (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({
          data: [],
          statusCode: 404,
        }),
      )
    }),
  )

  const spy = vi.spyOn(translations, 'searchTranslation')
  const { result } = await waitFor(() => renderHook(() => useSearchResults('test')))

  expect(spy).toHaveReturnedWith({
    data: [],
    statusCode: 404,
  })
})
