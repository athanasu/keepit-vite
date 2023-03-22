import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function handler(event) {
  const { limit = 10 } = event.queryStringParameters
  let results = []

  try {
    const translationsCount = await prisma.keepit_Translation.count()

    // TODO: Convert this to recursive function
    for (let i = 0; i < limit; i++) {
      let index = Math.floor(Math.random() * (translationsCount + 1))
      let randomTranslation = await prisma.keepit_Translation.findUnique({
        where: {
          id: index,
        },
      })

      // Making sure that we are not getting an id that doesn't exist
      while (!randomTranslation) {
        let newIndex = Math.floor(Math.random() * (translationsCount + 1))
        randomTranslation = await prisma.keepit_Translation.findUnique({
          where: {
            id: newIndex,
          },
        })
      }
      results.push(randomTranslation)
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
