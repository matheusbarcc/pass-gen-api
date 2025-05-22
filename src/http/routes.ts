import { FastifyInstance } from "fastify";
import { signUp } from "./controllers/sign-up";
import { signIn } from "./controllers/sign-in";
import { verifyJWT } from "./middlewares/verify-jwt";
import { createItem } from "./controllers/create-item";
import { fetchUserItems } from "./controllers/fetch-user-items";
import { deleteItem } from "./controllers/delete-item";
import { getUserDetails } from "./controllers/get-user-details";
import { updateUser } from "./controllers/update-user";

export async function appRoutes(app: FastifyInstance) {
  // public
  app.post('/signup', signUp)
  app.post('/signin', signIn)

  // private
  app.get('/me', { onRequest: [verifyJWT] }, getUserDetails)
  app.put('/me', { onRequest: [verifyJWT] }, updateUser)

  app.get('/items', { onRequest: [verifyJWT] }, fetchUserItems)
  app.post('/items', { onRequest: [verifyJWT] }, createItem)
  app.delete('/items/:itemId', { onRequest: [verifyJWT] }, deleteItem)
}