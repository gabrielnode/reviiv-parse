import { GetGameByIdUsecase } from "@modules/games/application/usecase/get-game-by-id.usecase";
import { GameRepository } from "@modules/games/domain/ports/game.repository";
import { mockSingleGame } from "../../../../mocks/games";
describe("GetGameByIdUsecase", () => {
  let gameRepository: jest.Mocked<GameRepository>;
  let getGameByIdUsecase: GetGameByIdUsecase;

  beforeEach(() => {
    gameRepository = {
      findGameById: jest.fn() as jest.Mock<
        Promise<{ id: number; name: string } | undefined>
      >,
    } as jest.Mocked<GameRepository>;

    getGameByIdUsecase = new GetGameByIdUsecase(gameRepository);
  });

  it("should return a game when found by ID", async () => {
    gameRepository.findGameById.mockResolvedValue(mockSingleGame);

    const result = await getGameByIdUsecase.execute({ id: "1" });

    expect(gameRepository.findGameById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockSingleGame);
  });

  it("should return undefined when the game is not found", async () => {
    gameRepository.findGameById.mockResolvedValue(undefined);

    const result = await getGameByIdUsecase.execute({ id: "2" });

    expect(gameRepository.findGameById).toHaveBeenCalledWith(2);
    expect(result).toBeUndefined();
  });

  it("should handle errors thrown by the repository", async () => {
    const mockError = new Error("Repository error");
    gameRepository.findGameById.mockRejectedValue(mockError);

    const result = await getGameByIdUsecase.execute({ id: "3" });

    expect(gameRepository.findGameById).toHaveBeenCalledWith(3);
    expect(result).toBe(mockError);
  });

  it("should parse the ID as an integer before querying the repository", async () => {
    gameRepository.findGameById.mockResolvedValue(mockSingleGame);

    const result = await getGameByIdUsecase.execute({ id: "05" });

    expect(gameRepository.findGameById).toHaveBeenCalledWith(5);
    expect(result).toEqual(mockSingleGame);
  });
});
