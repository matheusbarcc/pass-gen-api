import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { SignUpService } from "@/services/sign-up"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    birthday: z.coerce.date(),
    password: z.string().min(3)
  })

  const { name, email, birthday, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const signUpService = new SignUpService(usersRepository)

    await signUpService.execute({
      name,
      email,
      birthday,
      password
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}