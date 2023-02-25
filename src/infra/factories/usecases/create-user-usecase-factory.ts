import { CreateUserUseCase } from "../../../domain/users/usecases";
import { BcryptHashService, PrismaUsersRepository } from "../../gateways";

export const makeCreateUserUseCase = (): CreateUserUseCase => {
  const usersRepository = new PrismaUsersRepository();
  const hashService = new BcryptHashService();
  return new CreateUserUseCase(usersRepository, hashService);
};
