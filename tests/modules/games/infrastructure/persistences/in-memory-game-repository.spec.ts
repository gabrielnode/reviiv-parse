import { LogParser } from "@infrastructure/files-reader/log-parser";
import { InMemoryGameRepository } from "@infrastructure/persistences/in-memory-game-repository";
import { mockGames } from "../../../../mocks/games";

jest.mock("@infrastructure/files-reader/log-parser");

describe("InMemoryGameRepository", () => {
  let inMemoryGameRepository: InMemoryGameRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    (LogParser.getInstance as jest.Mock).mockReturnValue({
      getGames: jest.fn().mockReturnValue(mockGames),
    });

    inMemoryGameRepository = new InMemoryGameRepository(
      "mock-log-file-path.log",
    );
  });

  it("should initialize with games from the LogParser", () => {
    expect(LogParser.getInstance).toHaveBeenCalledWith(
      "mock-log-file-path.log",
    );
    expect(inMemoryGameRepository).toBeDefined();
  });

  it("should return a game when found by ID", async () => {
    const game = await inMemoryGameRepository.findGameById(1);

    expect(game).toEqual(mockGames[0]);
  });

  it("should return undefined when the game is not found", async () => {
    const game = await inMemoryGameRepository.findGameById(999);

    expect(game).toBeUndefined();
  });

  it("should call LogParser only once", () => {
    expect(LogParser.getInstance).toHaveBeenCalledTimes(1);
  });

  it("should handle empty game list gracefully", async () => {
    (LogParser.getInstance as jest.Mock).mockReturnValue({
      getGames: jest.fn().mockReturnValue([]),
    });

    const emptyRepository = new InMemoryGameRepository(
      "mock-log-file-path.log",
    );
    const game = await emptyRepository.findGameById(1);

    expect(game).toBeUndefined();
  });
});
