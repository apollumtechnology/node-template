import { User } from "../../../src/domain/users/entities";
import { FindUserByIdRepository } from "../../../src/domain/users/gateways";

export class FindUserByIdRepositoryMock implements FindUserByIdRepository {
  async findById(id: string): Promise<User | null> {
    const users = [
      User.toEntity({
        id: "any_user_id",
        name: "John Doe",
        email: "johndoe@mail.com",
        password: "any_hashed_value",
      }),
    ];
    const foundedUser = users.find((user) => user.id === id);
    return Promise.resolve(foundedUser || null);
  }
}
