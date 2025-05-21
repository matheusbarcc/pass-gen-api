import { FastifyInstance } from "fastify";
import { signUp } from "./controllers/sign-up";
import { signIn } from "./controllers/sign-in";
import { verifyJWT } from "./middlewares/verify-jwt";
import { createItem } from "./controllers/create-item";
import { fetchUserItems } from "./controllers/fetch-user-items";
import { deleteItem } from "./controllers/delete-item";

export async function appRoutes(app: FastifyInstance) {
  // public
  app.post('/signup', signUp)
  app.post('/signin', signIn)

  // private
  app.post('/items', { onRequest: [verifyJWT] }, createItem)
  app.get('/items', { onRequest: [verifyJWT] }, fetchUserItems)
  app.delete('/items/:itemId', { onRequest: [verifyJWT] }, deleteItem)
}