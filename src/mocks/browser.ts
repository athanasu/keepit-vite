import { setupWorker } from 'msw'

import { handlers } from './handlers'

export const worker = process.env.NODE_ENV === 'test' ? { start: () => {} } : setupWorker(...handlers)
