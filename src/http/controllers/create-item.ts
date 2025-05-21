import { PrismaItemsRepository } from "@/repositories/prisma/prisma-items-repository"
import { CreateItemService } from "@/services/create-item"
import { ItemLabelAlreadyExistsError } from "@/services/errors/item-label-already-exists-error"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createItem(request: FastifyRequest, reply: FastifyReply) {
  const createItemBodySchema = z.object({
    label: z.string().min(1),
    password: z.string().min(1)
  })

  const { label, password } = createItemBodySchema.parse(request.body)

  try {
    const itemsRepository = new PrismaItemsRepository()
    const createItemService = new CreateItemService(itemsRepository)

    await createItemService.execute({
      userId: request.user.sub,
      label,
      password
    })
  } catch (err) {
    if (err instanceof ItemLabelAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}