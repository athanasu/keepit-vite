import chance from 'chance'
import { Translation } from '~/types'

export const getTestItem = (): Translation => {
  return {
    id: chance().guid().toString(),
    from: chance().word({ length: 5 }),
    to: chance().word({ length: 5 }),
    notes: chance().sentence({ words: 5 }),
    createdAt: chance().date().toString(),
    updatedAt: chance().date().toString(),
  }
}
