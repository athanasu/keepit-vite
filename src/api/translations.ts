export async function fetchTranslations() {
  return await fetch('/.netlify/functions/read').then(async (res) => await res.json())
}

export async function removeTranslation(id: number) {
  return await fetch(`/.netlify/functions/delete?id=${id}`).then(async (res) => await res.json())
}
