import { GameRepository } from "../../domain/ports/game.repository";

export class GetGameByIdUsecase {
  constructor(private gameRepository: GameRepository) {}
  async execute({ id }: GetGameByIdUsecaseRequest.Request) {
    try {
      const game = await this.gameRepository.findGameById(parseInt(id));
      return game;
    } catch (error) {
      return error;
    }
  }
}

export namespace GetGameByIdUsecaseRequest {
  export type Request = {
    id: string;
  };

  export type Response = {};
}
