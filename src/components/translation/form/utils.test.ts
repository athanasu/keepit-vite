import { getTestItem, getTestItemOnlyFrom } from '~/helpers/get-test-item'

import { getInitialFormValues } from './utils'

it('should return the correct initial values if `from` is passed as argument', () => {
  expect(getInitialFormValues({ from: 'foo' })).toEqual({
    rules: {
      from: expect.any(Function),
      to: expect.any(Function),
    },
    values: {
      from: 'foo',
      to: '',
      notes: '',
    },
  })
})

it('should return the correct initial values if `item` is passed as argument', () => {
  const item = getTestItem()
  expect(getInitialFormValues({ item })).toEqual({
    rules: {
      from: expect.any(Function),
      to: expect.any(Function),
    },
    values: {
      from: item.from,
      to: item.to,
      notes: item.notes,
    },
  })
})

it('should return the correct initial values if none arguments are provided', () => {
  expect(getInitialFormValues({})).toEqual({
    rules: {
      from: expect.any(Function),
      to: expect.any(Function),
    },
    values: {
      from: '',
      to: '',
      notes: '',
    },
  })
})

it('should return the correct initial values if `item` has a `from` value', () => {
  const item = getTestItemOnlyFrom()
  expect(getInitialFormValues({ item })).toEqual({
    rules: {
      from: expect.any(Function),
      to: expect.any(Function),
    },
    values: {
      from: item.from,
      to: '',
      notes: item.notes,
    },
  })
})
