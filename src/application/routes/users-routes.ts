import { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers";
import { FindUserByIdController } from "../controllers/find-user-by-id-controller";

export async function usersRoutes(app: FastifyInstance) {
  const createUserController = new CreateUserController();
  app.post("/users", createUserController.run);

  const findUserByIdController = new FindUserByIdController();
  app.get("/users/:id", findUserByIdController.run);
}
