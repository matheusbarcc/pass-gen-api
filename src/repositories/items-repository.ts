import { Prisma, Item } from "prisma/generated/prisma";

export interface ItemsRepository {
  findByLabel(label: string): Promise<Item | null>
  findManyByUserId(userId: string): Promise<Item[]>
  create(data: Prisma.ItemUncheckedCreateInput): Promise<Item>
  delete(id: string): Promise<void>
}