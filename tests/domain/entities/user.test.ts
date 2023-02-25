import { describe, expect, it } from "vitest";
import { User } from "../../../src/domain/users/entities";

describe("User Entity Test Suite", () => {
  const userData = {
    name: "John Doe",
    email: "johndoe@mail.com",
    password: "123456",
  };

  it("should be create an user", () => {
    const user = User.toEntity(userData);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeTruthy();
    expect(user.email).toBe("johndoe@mail.com");
  });

  it("should be return a public user", () => {
    const user = User.toEntity(userData);

    expect(User.toPublic(user)).toEqual({
      id: user.id,
      name: "John Doe",
      email: "johndoe@mail.com",
    });
  });
});
