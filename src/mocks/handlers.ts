import chance from 'chance'
import { rest } from 'msw'

const length = 50
const page = 1

let fakeTranslations = Array.from({ length }, (_, i) => ({
  id: i + 1,
  from: chance().word(),
  to: chance().word(),
  notes: chance().paragraph(),
  createdAt: chance().date(),
  updatedAt: chance().date(),
}))

export const handlers = [
  rest.get('/.netlify/functions/read', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: fakeTranslations,
        statusCode: 200,
        total: fakeTranslations.length,
        totalPages: 1,
        currentPage: page.toString(),
      }),
    )
  }),
  rest.delete('/.netlify/functions/delete', (req, res, ctx) => {
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
  rest.patch('/.netlify/functions/update', (req, res, ctx) => {
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
  rest.post('/.netlify/functions/create', (req, res, ctx) => {
    const { from, to, notes } = req.body as any
    const newTranslation = {
      id: fakeTranslations.length + 1,
      from,
      to,
      notes,
      createdAt: chance().date(),
      updatedAt: chance().date(),
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
]
