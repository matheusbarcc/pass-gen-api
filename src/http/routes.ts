import { FastifyInstance } from "fastify";
import { signUp } from "./controllers/sign-up";
import { signIn } from "./controllers/sign-in";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post('/signup', signUp)
  app.post('/signin', signIn)

  app.get('/me', { onRequest: [verifyJWT] }, () => { return "me" })
}