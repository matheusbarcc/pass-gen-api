import { ItemsRepository } from "@/repositories/items-repository"
import { ItemNotFoundError } from "./errors/item-not-found-error"
import { UserNotAllowedError } from "./errors/user-not-allowed-error"

interface DeleteItemServiceRequest {
  userId: string
  itemId: string
}

export class DeleteItemService {
  constructor(private itemRepository: ItemsRepository) { }

  async execute({ userId, itemId }: DeleteItemServiceRequest) {
    const item = await this.itemRepository.findById(itemId)

    if (!item) {
      throw new ItemNotFoundError()
    }

    if (item.user_id !== userId) {
      throw new UserNotAllowedError()
    }

    await this.itemRepository.deleteById(itemId)
  }
}