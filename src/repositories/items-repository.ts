import { Prisma, Item } from "generated/prisma";

export interface ItemsRepository {
  findByLabelAndUserId(label: string, userId: string): Promise<Item | null>
  findById(id: string): Promise<Item | null>
  findManyByUserId(userId: string): Promise<Item[]>
  create(data: Prisma.ItemUncheckedCreateInput): Promise<Item>
  deleteById(id: string): Promise<void>
}