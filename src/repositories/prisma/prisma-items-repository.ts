import { prisma } from "@/lib/prisma";
import { Item, Prisma } from "prisma/generated/prisma";
import { ItemsRepository } from "../items-repository";

export class PrismaItemsRepository implements ItemsRepository {
  async findByLabel(label: string) {
    const item = await prisma.item.findFirst({
      where: {
        label,
      }
    })

    return item
  }

  async findManyByUserId(userId: string) {
    const items = await prisma.item.findMany({
      where: {
        user_id: userId
      }
    })

    return items
  }

  async create(data: Prisma.ItemUncheckedCreateInput) {
    const item = await prisma.item.create({
      data,
    })

    return item
  }

  async delete(id: string) {
    throw new Error("Method not implemented.");
  }
}