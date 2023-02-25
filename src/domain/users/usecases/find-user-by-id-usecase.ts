import { User } from "../entities";
import { FindUserByIdRepository } from "../gateways";

export class FindUserByIdUseCase {
  constructor(private readonly findUserByIdRepository: FindUserByIdRepository) {}

  public async perform(id: string): Promise<User> {
    const user = await this.findUserByIdRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }
}
