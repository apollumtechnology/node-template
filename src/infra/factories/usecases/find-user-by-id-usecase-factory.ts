import { FindUserByIdUseCase } from "../../../domain/users/usecases";
import { PrismaUsersRepository } from "../../gateways";

export const makeFindUserByIdUseCase = (): FindUserByIdUseCase => {
  const usersRepository = new PrismaUsersRepository();
  return new FindUserByIdUseCase(usersRepository);
};
