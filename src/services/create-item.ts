import { ItemsRepository } from "@/repositories/items-repository"
import { ItemLabelAlreadyExistsError } from "./errors/item-label-already-exists-error"

interface CreateItemServiceRequest {
  userId: string
  label: string
  password: string
}

export class CreateItemService {
  constructor(private itemRepository: ItemsRepository) { }

  async execute({ userId, label, password }: CreateItemServiceRequest) {
    const itemWithSameLabel = await this.itemRepository.findByLabel(label)

    if (itemWithSameLabel) {
      throw new ItemLabelAlreadyExistsError()
    }

    await this.itemRepository.create({
      user_id: userId,
      label,
      password
    })
  }
}