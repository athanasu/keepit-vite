import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function handler(event) {
  const { id } = event.queryStringParameters
  try {
    const translation = await prisma.keepit_Translation.delete({ where: { id: parseInt(id) } })
    return {
      statusCode: 200,
      header: 'Content-Type: application/json',
      body: JSON.stringify({
        data: translation,
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
