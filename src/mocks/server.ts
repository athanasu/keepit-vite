import { setupServer } from 'msw/node'
import fetch, { Request, Response } from 'node-fetch'
import ResizeObserver from 'resize-observer-polyfill'

import { handlers } from './handlers'

global.fetch = fetch as typeof global.fetch
global.Request = Request as any
global.Response = Response as typeof global.Response
global.ResizeObserver = ResizeObserver

export const server = setupServer(...handlers)
