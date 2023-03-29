export const getUrl = (url: string): string => (process.env.NODE_ENV === 'test' ? `http://localhost:8888${url}` : url)
