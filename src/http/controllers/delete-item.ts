import { PrismaItemsRepository } from "@/repositories/prisma/prisma-items-repository"
import { DeleteItemService } from "@/services/delete-item"
import { ItemNotFoundError } from "@/services/errors/item-not-found-error"
import { UserNotAllowedError } from "@/services/errors/user-not-allowed-error"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deleteItem(request: FastifyRequest, reply: FastifyReply) {
  const deleteItemBodySchema = z.object({
    itemId: z.string().uuid()
  })

  const { itemId } = deleteItemBodySchema.parse(request.params)

  try {
    const itemsRepository = new PrismaItemsRepository()
    const deleteItemService = new DeleteItemService(itemsRepository)

    await deleteItemService.execute({
      userId: request.user.sub,
      itemId
    })
  } catch (err) {
    if (err instanceof ItemNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof UserNotAllowedError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}