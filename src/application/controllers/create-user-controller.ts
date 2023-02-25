import { FastifyRequest } from "fastify";
import { z } from "zod";

import { CreateUserUseCase } from "../../domain/users/usecases";
import { makeCreateUserUseCase } from "../../infra/factories";

export class CreateUserController {
  private readonly createUserUseCase: CreateUserUseCase;

  constructor() {
    this.createUserUseCase = makeCreateUserUseCase();
  }

  async run(request: FastifyRequest) {
    const createUserBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const userData = createUserBody.parse(request.body);
    const user = await this.createUserUseCase.perform(userData);
    return user;
  }
}
