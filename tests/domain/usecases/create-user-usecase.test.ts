import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HashService } from "../../../src/domain/users/gateways";
import { CreateUserRepository } from "../../../src/domain/users/gateways/repositories";
import { CreateUserUseCase } from "../../../src/domain/users/usecases";
import { CreateUserRepositoryMock } from "../../mocks/repositories/create-user-repository.mock";
import { HashServiceMock } from "../../mocks/services/hash-service.mock";

describe("CreateUserUseCase Test Suite", () => {
  let createUserRepository: CreateUserRepository;
  let hashService: HashService;
  let sut: CreateUserUseCase;

  beforeEach(() => {
    createUserRepository = new CreateUserRepositoryMock();
    hashService = new HashServiceMock();
    sut = new CreateUserUseCase(createUserRepository, hashService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const usecaseInput = {
    name: "John Doe",
    email: "johndoe@mail.com",
    password: "123456",
  };

  const userId = Buffer.from(`${usecaseInput.name}:${usecaseInput.email}`).toString("base64");

  it("should be call HashService with correct values", async () => {
    const hashSpy = vi.spyOn(hashService, "hash");

    await sut.execute(usecaseInput);

    expect(hashSpy).toHaveBeenCalledWith("123456");
    expect(hashSpy).toHaveBeenCalledTimes(1);
  });

  it("should be throw if HashService throws", async () => {
    vi.spyOn(hashService, "hash").mockRejectedValueOnce(new Error("Error in hash method"));
    const promise = sut.execute(usecaseInput);

    await expect(promise).rejects.toThrow("Error in hash method");
  });

  it("should be call CreateUserRepository with correct values", async () => {
    const saveSpy = vi.spyOn(createUserRepository, "save");

    await sut.execute(usecaseInput);

    expect(saveSpy).toHaveBeenCalledWith({
      id: userId,
      name: "John Doe",
      email: "johndoe@mail.com",
      password: "any_hashed_value",
    });
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });

  it("should be throw if CreateUserRepository throws", async () => {
    vi.spyOn(createUserRepository, "save").mockRejectedValueOnce(new Error("Error in save method"));
    const promise = sut.execute(usecaseInput);

    await expect(promise).rejects.toThrow("Error in save method");
  });

  it("should be save an user and return a public user", async () => {
    const result = await sut.execute(usecaseInput);

    expect(result).toEqual({
      id: userId,
      name: "John Doe",
      email: "johndoe@mail.com",
    });
  });
});
