import { getUrl } from '~/helpers/get-url'
import { FetchPayload, FlashcardPayload, Payload } from '~/types'

export async function fetchTranslations(payload: FetchPayload) {
  const { page = 1, limit = '50' } = payload
  return await fetch(getUrl(`/.netlify/functions/read?page=${page}&limit=${parseInt(limit)}`)).then(
    async (res) => await res.json(),
  )
}

export async function removeTranslation(id: string) {
  return await fetch(getUrl(`/.netlify/functions/delete?id=${id}`), { method: 'DELETE' }).then(
    async (res) => await res.json(),
  )
}

export async function addTranslation(payload: Payload) {
  return await fetch(getUrl('/.netlify/functions/create'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(async (res) => await res.json())
}

export async function updateTranslation(id: string, payload: Payload) {
  return await fetch(getUrl(`/.netlify/functions/update?id=${id}`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(async (res) => await res.json())
}

export async function searchTranslation(q: string) {
  return await fetch(getUrl(`/.netlify/functions/search?q=${q}`)).then(async (res) => await res.json())
}

export async function fetchFlashcards(payload: FlashcardPayload) {
  const { limit = '10' } = payload
  return await fetch(getUrl(`/.netlify/functions/flashcards?limit=${parseInt(limit)}`)).then(
    async (res) => await res.json(),
  )
}
