import { prisma } from "@/lib/prisma";
import { ItemsRepository } from "../items-repository";
import { Prisma } from "generated/prisma";

export class PrismaItemsRepository implements ItemsRepository {
  async findByLabelAndUserId(label: string, userId: string) {
    const item = await prisma.item.findFirst({
      where: {
        label,
        user_id: userId
      }
    })

    return item
  }

  async findById(id: string) {
    const item = await prisma.item.findUnique({
      where: {
        id,
      }
    })

    return item
  }

  async findManyByUserId(userId: string) {
    const items = await prisma.item.findMany({
      where: {
        user_id: userId
      },
      orderBy: {
        created_at: 'desc'
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

  async deleteById(id: string) {
    await prisma.item.delete({
      where: {
        id,
      }
    })
  }
}