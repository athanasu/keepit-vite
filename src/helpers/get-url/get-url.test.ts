import { getUrl } from '.'

const getExpectedResult = () => {
  return process.env.NODE_ENV === 'test' ? 'http://localhost:8888/.netlify/functions/read' : '/.netlify/functions/read'
}

afterEach(() => {
  process.env.NODE_ENV = 'test'
})

it('should return the correct URL if NODE_ENV === `test`', () => {
  expect(getUrl('/.netlify/functions/read')).toBe(getExpectedResult())
})

it('should return the correct URL if NODE_ENV !== `test`', () => {
  process.env.NODE_ENV = 'mocked-env'
  expect(getUrl('/.netlify/functions/read')).toBe(getExpectedResult())
})
