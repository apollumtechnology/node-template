import { CreateUserRepository } from "../../../src/domain/users/gateways/repositories";
import { User } from "../../../src/domain/users/entities";

export class CreateUserRepositoryMock implements CreateUserRepository {
  async save(user: User): Promise<User> {
    return Promise.resolve(user);
  }
}
