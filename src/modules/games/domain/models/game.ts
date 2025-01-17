export interface Game {
  id: number;
  totalKills: number;
  players: string[];
  kills: Record<string, number>;
}
