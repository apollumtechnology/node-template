import bcrypt from "bcrypt";

import { HashService } from "../../../domain/users/gateways";

export class BcryptHashService implements HashService {
  async hash(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(plainText, salt);
  }
}
