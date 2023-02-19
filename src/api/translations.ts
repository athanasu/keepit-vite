export async function fetchTranslations() {
  return await fetch('/.netlify/functions/translations').then(async (res) => await res.json())
}
