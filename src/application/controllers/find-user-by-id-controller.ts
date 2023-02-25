import { FastifyRequest } from "fastify";
import { z } from "zod";
import { FindUserByIdUseCase } from "../../domain/users/usecases";
import { makeFindUserByIdUseCase } from "../../infra/factories";

export class FindUserByIdController {
  async run(request: FastifyRequest) {
    const findUserByIdParams = z.object({
      id: z.string(),
    });

    const params = findUserByIdParams.parse(request.params);

    const findUserByIdUseCase = makeFindUserByIdUseCase();
    const user = await findUserByIdUseCase.execute(params.id);
    return user;
  }
}
