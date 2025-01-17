import { InMemoryGameRepository } from "@infrastructure/persistences/in-memory-game-repository";

export const makeInMemoryGameRepository = (path: string) => {
  return new InMemoryGameRepository(path);
};
