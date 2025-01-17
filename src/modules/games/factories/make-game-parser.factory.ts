import { GetGameByIdUsecase } from "@modules/games/application/usecase/get-game-by-id.usecase";
import { makeInMemoryGameRepository } from "./make-in-memory-game-repository.factory";
import * as path from "path";

export const makeGameParserUseCase = () => {
  const fullPath: string = path.join(__dirname, "..", "files", "games.log");

  return new GetGameByIdUsecase(makeInMemoryGameRepository(fullPath));
};
