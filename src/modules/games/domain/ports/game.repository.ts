import { Game } from "../models/game";

export interface GameRepository {
  findGameById(id: number): Promise<Game | undefined>;
}
