import fs from "fs";
import { LogParser } from "@modules/games/infrastructure/files-reader/log-parser";
import { Game } from "@domain/models/game";

jest.mock("fs");

describe("LogParser", () => {
  const mockFilePath = "mock-file-path.log";

  beforeEach(() => {
    jest.resetAllMocks();
    (LogParser as typeof LogParser).instance = null;
  });

  it("should create a singleton instance of LogParser", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue("");
    const instance1 = LogParser.getInstance(mockFilePath);
    const instance2 = LogParser.getInstance(mockFilePath);

    expect(instance1).toBe(instance2);
  });

  it("should parse the log file and return the correct games data", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(`
      InitGame:
      ClientUserinfoChanged: n\\Player1\\t\\
      ClientUserinfoChanged: n\\Player2\\t\\
      Kill: 1022 2 22: <world> killed Player1 by MOD_TRIGGER_HURT
      Kill: 2 3 10: Player2 killed Player3 by MOD_RAILGUN
      ShutdownGame:
      InitGame:
      ClientUserinfoChanged: n\\Player1\\t\\
      ShutdownGame:
    `);

    const parser = LogParser.getInstance(mockFilePath);
    const games = parser.getGames();

    expect(games).toHaveLength(2);

    expect(games[0]).toEqual<Game>({
      id: 1,
      totalKills: 2,
      players: ["Player1", "Player2"],
      kills: {
        Player1: -1,
        Player2: 1,
      },
    });

    expect(games[1]).toEqual<Game>({
      id: 2,
      totalKills: 0,
      players: ["Player1"],
      kills: {
        Player1: 0,
      },
    });
  });

  it("should handle logs with no games gracefully", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue("");
    const parser = LogParser.getInstance(mockFilePath);
    const games = parser.getGames();

    expect(games).toHaveLength(0);
  });

  it("should handle incomplete games gracefully", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(`
      InitGame:
      ClientUserinfoChanged: n\\Player1\\t\\
    `);
    const parser = LogParser.getInstance(mockFilePath);
    const games = parser.getGames();

    expect(games).toHaveLength(1);
    expect(games[0]).toEqual<Game>({
      id: 1,
      totalKills: 0,
      players: ["Player1"],
      kills: {
        Player1: 0,
      },
    });
  });

  it("should process kills correctly", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(`
      InitGame:
      ClientUserinfoChanged: n\\Player1\\t\\
      ClientUserinfoChanged: n\\Player2\\t\\
      Kill: 2 2 10: Player1 killed Player2 by MOD_RAILGUN
      ShutdownGame:
    `);

    const parser = LogParser.getInstance(mockFilePath);
    const games = parser.getGames();

    expect(games).toHaveLength(1);
    expect(games[0]).toEqual<Game>({
      id: 1,
      totalKills: 1,
      players: ["Player1", "Player2"],
      kills: {
        Player1: 1,
        Player2: 0,
      },
    });
  });
});
