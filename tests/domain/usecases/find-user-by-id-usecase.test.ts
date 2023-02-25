import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { FindUserByIdRepository } from "../../../src/domain/users/gateways";
import { FindUserByIdUseCase } from "../../../src/domain/users/usecases";
import { FindUserByIdRepositoryMock } from "../../mocks/repositories/find-user-by-id-repository.mock";

describe("FindUserByIdUseCase Test Suite", () => {
  let findUserByIdRepository: FindUserByIdRepository;
  let sut: FindUserByIdUseCase;

  beforeEach(() => {
    findUserByIdRepository = new FindUserByIdRepositoryMock();
    sut = new FindUserByIdUseCase(findUserByIdRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const usecaseInput = "any_user_id";

  it("should be call FindUserByIdRepository with correct value", async () => {
    const findByIdSpy = vi.spyOn(findUserByIdRepository, "findById");

    await sut.perform(usecaseInput);

    expect(findByIdSpy).toHaveBeenCalledWith("any_user_id");
  });

  it("should be throw if FindUserByIdRepository throws", async () => {
    vi.spyOn(findUserByIdRepository, "findById").mockRejectedValueOnce(new Error("Find repository error"));

    const promise = sut.perform(usecaseInput);

    await expect(promise).rejects.toThrow("Find repository error");
  });

  it("should be throw if FindUserByIdRepository returns null", async () => {
    const promise = sut.perform("invalid_user_id");

    await expect(promise).rejects.toThrow("User not found");
  });

  it("should be return a user on success", async () => {
    const result = await sut.perform(usecaseInput);

    expect(result).toEqual({
      id: "any_user_id",
      name: "John Doe",
      email: "johndoe@mail.com",
      password: "any_hashed_value",
    });
  });
});
