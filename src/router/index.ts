import { gameRouter } from "@modules/games/entrypoints/game-http.entrypoint";
import { Router } from "express";

export const mainRouter = Router();

mainRouter.use("/games", gameRouter);
