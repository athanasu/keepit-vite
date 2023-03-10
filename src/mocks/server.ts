import { setupServer } from 'msw/node'
import fetch, { Request, Response } from 'node-fetch'

import { handlers } from './handlers'

global.fetch = fetch
global.Request = Request
global.Response = Response

export const server = setupServer(...handlers)
