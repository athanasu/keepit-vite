import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function handler(event) {
  const { q } = event.queryStringParameters
  try {
    const searchResults = await prisma.keepit_Translation.findMany({
      where: { from: q },
    })

    if (!searchResults.length) {
      return {
        statusCode: 404,
        header: 'Content-Type: application/json',
        body: JSON.stringify({
          data: [],
          statusCode: 404,
        }),
      }
    }

    return {
      statusCode: 200,
      header: 'Content-Type: application/json',
      body: JSON.stringify({
        data: searchResults,
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
