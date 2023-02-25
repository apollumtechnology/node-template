import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/users/entities";
import { CreateUserRepository, FindUserByIdRepository } from "../../../domain/users/gateways";

export class PrismaUsersRepository implements CreateUserRepository, FindUserByIdRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async save(user: User): Promise<User> {
    const persistedUser = await this.client.user.create({ data: user });
    return persistedUser;
  }

  async findById(id: string): Promise<User | null> {
    const foundedUser = await this.client.user.findUnique({ where: { id } });
    return foundedUser;
  }
}
