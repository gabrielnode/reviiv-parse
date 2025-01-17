import { Game } from "@modules/games/domain/models/game";
import { GameRepository } from "@modules/games/domain/ports/game.repository";
import { LogParser } from "../files-reader/log-parser";

export class InMemoryGameRepository implements GameRepository {
  private games: Game[];

  constructor(logFilePath: string) {
    const logParser = LogParser.getInstance(logFilePath);
    this.games = logParser.getGames();
  }

  async findGameById(id: number): Promise<Game | undefined> {
    return this.games.find((game) => game.id === id);
  }
}
