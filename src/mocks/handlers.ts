import { rest } from 'msw'
import { getTestItem } from '~/helpers/get-test-item'
import { getUrl } from '~/helpers/get-url'

export const LENGTH = 25
const PAGE = 1

let fakeTranslations = Array.from({ length: LENGTH }, (_, i) => ({
  ...getTestItem(),
  id: i + 1,
}))

export const handlers = [
  rest.get(getUrl('/.netlify/functions/read'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: fakeTranslations,
        statusCode: 200,
        total: fakeTranslations.length,
        totalPages: 1,
        currentPage: PAGE.toString(),
      }),
    )
  }),
  rest.delete(getUrl('/.netlify/functions/delete'), (req, res, ctx) => {
    const id = req.url.searchParams.get('id') as string
    const deletedTranslation = fakeTranslations.find((t) => t.id === parseInt(id))
    fakeTranslations = fakeTranslations.filter((t) => t.id !== parseInt(id))
    return res(
      ctx.status(200),
      ctx.json({
        data: deletedTranslation,
        statusCode: 200,
      }),
    )
  }),
  rest.patch(getUrl('/.netlify/functions/update'), (req, res, ctx) => {
    const id = req.url.searchParams.get('id') as string
    const { from, to, notes } = req.body as any
    const updateTranslation = fakeTranslations.find((t) => t.id === parseInt(id))
    if (updateTranslation) {
      updateTranslation.from = from
      updateTranslation.to = to
      updateTranslation.notes = notes
    }

    fakeTranslations = fakeTranslations.map((t) => {
      if (t.id === parseInt(id)) {
        return { ...t, from, to, notes }
      }
      return t
    })
    return res(
      ctx.status(200),
      ctx.json({
        data: updateTranslation,
        statusCode: 200,
      }),
    )
  }),
  rest.post(getUrl('/.netlify/functions/create'), (req, res, ctx) => {
    const { from, to, notes } = req.body as any
    const newTranslation = {
      ...getTestItem(),
      id: fakeTranslations.length + 1,
      from,
      to,
      notes,
    }

    fakeTranslations.unshift(newTranslation)

    return res(
      ctx.status(200),
      ctx.json({
        data: newTranslation,
        statusCode: 200,
      }),
    )
  }),
  rest.get(getUrl('/.netlify/functions/search'), (req, res, ctx) => {
    const q = req.url.searchParams.get('q') as string
    const found = fakeTranslations.find((t) => t.from === q)

    return res(
      ctx.status(200),
      ctx.json({
        data: [found],
        statusCode: 200,
      }),
    )
  }),
  rest.get(getUrl('/.netlify/functions/flashcards'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: fakeTranslations,
        statusCode: 200,
      }),
    )
  }),
]
