import { ItemsRepository } from "@/repositories/items-repository"
import { Item } from "prisma/generated/prisma"

interface FetchUserItemsServiceRequest {
  userId: string
}

interface FetchUserItemsServiceResponse {
  items: Item[]
}

export class FetchUserItemsService {
  constructor(private itemsRepository: ItemsRepository) { }

  async execute({
    userId,
  }: FetchUserItemsServiceRequest): Promise<FetchUserItemsServiceResponse> {
    const items = await this.itemsRepository.findManyByUserId(userId)

    return {
      items,
    }
  }
}