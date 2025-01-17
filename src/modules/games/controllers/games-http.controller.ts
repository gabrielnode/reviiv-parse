import { makeGameParserUseCase } from "@factories/make-game-parser.factory";
import { Request, Response, NextFunction } from "express";

export class GameHttpController {
  static async GetGameById(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await makeGameParserUseCase().execute({
        id: req.params.id,
      });
      res.status(200).json(response);
    } catch (error) {
      next(error); // Garante que o erro seja passado ao middleware
    }
  }
}
