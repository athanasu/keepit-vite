import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function handler(event, context) {
  try {
    const translations = await prisma.keepit_Translation.findMany()
    return {
      statusCode: 200,
      header: 'Content-Type: application/json',
      body: JSON.stringify(translations),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    }
  }
}
