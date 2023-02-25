import { HashService } from "../../../src/domain/users/gateways";

export class HashServiceMock implements HashService {
  async hash(value: string): Promise<string> {
    return Promise.resolve("any_hashed_value");
  }
}
