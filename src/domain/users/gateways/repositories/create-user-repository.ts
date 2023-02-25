import { User } from "../../entities";

export interface CreateUserRepository {
  save(user: User): Promise<User>;
}
