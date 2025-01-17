import { Game } from "@modules/games/domain/models/game";

export const mockGames: Game[] = [
  {
    id: 1,
    totalKills: 15,
    players: ["Player1", "Player2", "Player3"],
    kills: {
      Player1: 10,
      Player2: 3,
      Player3: 2,
    },
  },
  {
    id: 2,
    totalKills: 8,
    players: ["Player4", "Player5"],
    kills: {
      Player4: 5,
      Player5: 3,
    },
  },
];

// Mock de um único jogo
export const mockSingleGame: Game = {
  id: 3,
  totalKills: 12,
  players: ["Player6", "Player7"],
  kills: {
    Player6: 7,
    Player7: 5,
  },
};

// Funções utilitárias para retornar jogos específicos
export const getMockGameById = (id: number): Game | undefined =>
  mockGames.find((game) => game.id === id);
