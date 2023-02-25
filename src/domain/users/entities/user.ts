type UserData = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

type UserPublicData = {
  id: string;
  name: string;
  email: string;
};

export class User {
  public readonly id: string;

  public readonly name: string;

  public readonly email: string;

  public readonly password: string;

  private constructor(data: UserData) {
    this.id = data.id || Buffer.from(`${data.name}:${data.email}`).toString("base64");
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  public static toEntity(data: UserData): User {
    return new User(data);
  }

  public static toPublic(user: User): UserPublicData {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
