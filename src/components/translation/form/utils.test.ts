import { getTestItem, getTestItemOnlyFrom } from '~/helpers/get-test-item'

import { getInitialFormValues } from './utils'

it('should return the correct rules', () => {
  const item1 = { from: 'x', to: 'y' }
  const result1 = getInitialFormValues({ item: item1 })
  expect(result1.rules.from(item1.from)).toEqual('Must have at least 2 letters')
  expect(result1.rules.to(item1.to)).toEqual('Must have at least 2 letters')

  const item2 = { from: 'xxx', to: 'y' }
  const result2 = getInitialFormValues({ item: item2 })
  expect(result2.rules.from(item2.from)).toEqual(null)
  expect(result2.rules.to(item2.to)).toEqual('Must have at least 2 letters')

  const item3 = { from: 'x', to: 'yyy' }
  const result3 = getInitialFormValues({ item: item2 })
  expect(result3.rules.from(item3.from)).toEqual('Must have at least 2 letters')
  expect(result3.rules.to(item3.to)).toEqual(null)
})

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

it('should return the correct initial values if `item` has not a `from` value', () => {
  const item = { to: 'y' }
  expect(getInitialFormValues({ item })).toEqual({
    rules: {
      from: expect.any(Function),
      to: expect.any(Function),
    },
    values: {
      from: '',
      to: item.to,
      notes: '',
    },
  })
})
