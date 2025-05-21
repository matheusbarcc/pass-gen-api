import { PrismaItemsRepository } from "@/repositories/prisma/prisma-items-repository"
import { FetchUserItemsService } from "@/services/fetch-user-items"
import { FastifyReply, FastifyRequest } from "fastify"

export async function fetchUserItems(request: FastifyRequest, reply: FastifyReply) {
  const itemsRepository = new PrismaItemsRepository()
  const fetchUserItemsService = new FetchUserItemsService(itemsRepository)

  const { items } = await fetchUserItemsService.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    items,
  })
}