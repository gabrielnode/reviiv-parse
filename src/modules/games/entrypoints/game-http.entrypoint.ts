import { Router } from "express";
import { GameHttpController } from "@modules/games/controllers/games-http.controller";

export const gameRouter = Router();

gameRouter.get("/:id", GameHttpController.GetGameById);
