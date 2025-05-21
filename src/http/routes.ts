import { FastifyInstance } from "fastify";
import { signUp } from "./controllers/sign-up";
import { signIn } from "./controllers/sign-in";
import { verifyJWT } from "./middlewares/verify-jwt";
import { createItem } from "./controllers/create-item";

export async function appRoutes(app: FastifyInstance) {
  // public
  app.post('/signup', signUp)
  app.post('/signin', signIn)

  // private
  app.post('/item', { onRequest: [verifyJWT] }, createItem)
}