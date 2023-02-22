import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function handler(event) {
  const { q } = event.queryStringParameters
  try {
    const translation = await prisma.keepit_Translation.findMany({
      where: { from: q },
    })
    if (!translation.length) {
      return {
        statusCode: 404,
        header: 'Content-Type: application/json',
        body: JSON.stringify({ message: 'Translation not found' }),
      }
    }

    return {
      statusCode: 200,
      header: 'Content-Type: application/json',
      body: JSON.stringify(translation),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    }
  }
}
