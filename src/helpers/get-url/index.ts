// In order to mock the Netlify functions in tests locally we need to run 'netlify dev' in the background and amend the URL to point to the local server.
export const getUrl = (url: string): string => (process.env.NODE_ENV === 'test' ? `http://localhost:8888${url}` : url)
