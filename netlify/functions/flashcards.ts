import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function handler(event) {
  const { limit = 10 } = event.queryStringParameters
  let results: [] = []
  let resultsId: number[] = []

  const getTranslation = async (id) => {
    const translation = await prisma.keepit_Translation.findUnique({
      where: {
        id,
      },
    })

    return translation
  }

  try {
    const translationsCount = await prisma.keepit_Translation.count()

    while (results.length < limit) {
      let index = Math.floor(Math.random() * (translationsCount + 1))

      if (!resultsId.includes(index)) {
        resultsId.push(index)
        let randomTranslation = await getTranslation(index)

        // Making sure that we are not getting an id that doesn't exist
        while (!randomTranslation) {
          let newIndex = Math.floor(Math.random() * (translationsCount + 1))
          randomTranslation = await getTranslation(newIndex)
        }

        results.push(randomTranslation)
      }
    }

    return {
      statusCode: 200,
      header: 'Content-Type: application/json',
      body: JSON.stringify({
        data: results,
        statusCode: 200,
      }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    }
  }
}
