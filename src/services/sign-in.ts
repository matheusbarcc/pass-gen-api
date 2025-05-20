import { UsersRepository } from "@/repositories/users-repository"
import { compare } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-crendentials-error"

interface SignInServiceRequest {
  email: string
  password: string
}

type SignInServiceResponse = void

export class SignInService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, password }: SignInServiceRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }

  }
}