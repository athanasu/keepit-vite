import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function handler(event) {
  const { page = 1, limit = 50 } = event.queryStringParameters
  try {
    const data = await prisma.keepit_Translation.findMany({ orderBy: { createdAt: 'desc' } })
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = data.slice(startIndex, endIndex)

    return {
      statusCode: 200,
      header: 'Content-Type: application/json',
      body: JSON.stringify({
        data: results,
        total: data.length,
        currentPage: page,
        totalPages: Math.ceil(data.length / limit),
      }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    }
  }
}
