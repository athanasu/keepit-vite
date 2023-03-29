import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function handler(event) {
  const { limit = 10 } = event.queryStringParameters
  let results = []
  let resultsId = new Set<number>()

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
      const index = Math.floor(Math.random() * translationsCount)

      if (resultsId.has(index)) {
        continue
      }

      resultsId.add(index)
      let randomTranslation = await getTranslation(index)

      if (randomTranslation) {
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
