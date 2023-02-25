import { User } from "../../entities";

export interface FindUserByIdRepository {
  findById(id: string): Promise<User | null>;
}
