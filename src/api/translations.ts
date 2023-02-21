export async function fetchTranslations() {
  return await fetch('/.netlify/functions/read').then(async (res) => await res.json())
}

export async function removeTranslation(id: number) {
  return await fetch(`/.netlify/functions/delete?id=${id}`).then(async (res) => await res.json())
}

export async function addTranslation(payload: any) {
  return await fetch('/.netlify/functions/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(async (res) => await res.json())
}

export async function updateTranslation(id: number, payload: any) {
  return await fetch(`/.netlify/functions/update?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(async (res) => await res.json())
}
