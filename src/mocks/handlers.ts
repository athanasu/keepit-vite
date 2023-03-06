import chance from 'chance'
import { rest } from 'msw'

const fakeTranslations = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  from: chance().word(),
  to: chance().word(),
  notes: chance().paragraph(),
  createdAt: chance().date(),
  updatedAt: chance().date(),
}))

export const handlers = [
  rest.get('/.netlify/functions/read?page=1&limit=50', (req, res, ctx) => {
    console.log('fakeTranslations', fakeTranslations)
    return res(ctx.status(200), ctx.json(fakeTranslations))
  }),
]
