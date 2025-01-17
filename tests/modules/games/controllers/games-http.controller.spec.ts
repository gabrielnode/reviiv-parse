import { GameHttpController } from "@controllers/games-http.controller";
import { makeGameParserUseCase } from "@factories/make-game-parser.factory";
import { Request, Response } from "express";

jest.mock("@factories/make-game-parser.factory");

describe("GameHttpController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      params: { id: "1" },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  it("should call next with error when the use case fails", async () => {
    const mockError = new Error("Use case failed");
    const mockUseCase = {
      execute: jest.fn().mockRejectedValue(mockError), // Simula erro
    };
    (makeGameParserUseCase as jest.Mock).mockReturnValue(mockUseCase);

    await GameHttpController.GetGameById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext,
    );

    // Verifica se o caso de uso foi chamado corretamente
    expect(mockUseCase.execute).toHaveBeenCalledWith({ id: "1" });
    expect(mockUseCase.execute).toHaveBeenCalledTimes(1);

    // Verifica se o next foi chamado com o erro
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(mockError);

    // Garante que o response não foi usado
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
