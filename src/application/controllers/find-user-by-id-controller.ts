import { FastifyRequest } from "fastify";
import { z } from "zod";
import { FindUserByIdUseCase } from "../../domain/users/usecases";
import { makeFindUserByIdUseCase } from "../../infra/factories";

export class FindUserByIdController {
  private readonly findUserByIdUseCase: FindUserByIdUseCase;

  constructor() {
    this.findUserByIdUseCase = makeFindUserByIdUseCase();
  }

  async run(request: FastifyRequest) {
    const findUserByIdParams = z.object({
      id: z.string(),
    });

    const params = findUserByIdParams.parse(request.params);
    const user = await this.findUserByIdUseCase.perform(params.id);
    return user;
  }
}
