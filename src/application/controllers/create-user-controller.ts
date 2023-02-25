import { FastifyRequest } from "fastify";
import { z } from "zod";

import { CreateUserUseCase } from "../../domain/users/usecases";
import { makeCreateUserUseCase } from "../../infra/factories";

export class CreateUserController {
  async run(request: FastifyRequest) {
    const createUserBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const userData = createUserBody.parse(request.body);

    const createUserUseCase = makeCreateUserUseCase();
    const user = await createUserUseCase.execute(userData);
    return user;
  }
}
