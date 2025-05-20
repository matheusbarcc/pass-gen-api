import { FastifyInstance } from "fastify";
import { signUp } from "./controllers/sign-up";

export async function appRoutes(app: FastifyInstance) {
  app.post('/signup', signUp)
}