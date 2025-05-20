import { prisma } from "@/lib/prisma"
import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

interface SignUpServiceRequest {
  name: string
  email: string
  birthday: Date
  password: string
}

export class SignUpService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ name, email, birthday, password }: SignUpServiceRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error("Este e-mail já está em uso.")
    }

    await this.usersRepository.create({
      name,
      email,
      birthday,
      password_hash
    })
  }
}