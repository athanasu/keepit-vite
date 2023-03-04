import { FetchPayload, Payload } from '~/types'

export async function fetchTranslations(payload: FetchPayload) {
  const { page = 1, limit = '50' } = payload
  return await fetch(`/.netlify/functions/read?page=${page}&limit=${parseInt(limit)}`).then(
    async (res) => await res.json(),
  )
}

export async function removeTranslation(id: string) {
  return await fetch(`/.netlify/functions/delete?id=${id}`).then(async (res) => await res.json())
}

export async function addTranslation(payload: Payload) {
  return await fetch('/.netlify/functions/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(async (res) => await res.json())
}

export async function updateTranslation(id: string, payload: Payload) {
  return await fetch(`/.netlify/functions/update?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(async (res) => await res.json())
}

export async function searchTranslation(q: string) {
  return await fetch(`/.netlify/functions/search?q=${q}`).then(async (res) => await res.json())
}
