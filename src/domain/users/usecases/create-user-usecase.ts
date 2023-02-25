import { User } from "../entities";
import { HashService } from "../gateways";
import { CreateUserRepository } from "../gateways/repositories";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

type CreateUserOutput = {
  id: string;
  name: string;
  email: string;
};

export class CreateUserUseCase {
  constructor(private readonly createUserRepository: CreateUserRepository, private readonly hashService: HashService) {}

  public async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const hashedPassword = await this.hashService.hash(input.password);
    const userEntity = User.toEntity({ ...input, password: hashedPassword });
    const user = await this.createUserRepository.save(userEntity);
    return User.toPublic(user);
  }
}
