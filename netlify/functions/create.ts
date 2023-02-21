import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function handler(event) {
  const { from, to, notes } = JSON.parse(event.body)
  try {
    const translation = await prisma.keepit_Translation.create({
      data: { from, to, notes },
    })
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
