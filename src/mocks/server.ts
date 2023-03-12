import { setupServer } from 'msw/node'
import fetch, { Request, Response } from 'node-fetch'
import ResizeObserver from 'resize-observer-polyfill'

import { handlers } from './handlers'

global.fetch = fetch
global.Request = Request
global.Response = Response
global.ResizeObserver = ResizeObserver

export const server = setupServer(...handlers)
