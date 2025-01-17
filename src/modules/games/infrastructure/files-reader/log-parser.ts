import { Game } from "@modules/games/domain/models/game";
import fs from "fs";

export class LogParser {
  static instance: LogParser | null = null;
  private games: Game[] = [];
  private filePath: string;

  private constructor(filePath: string) {
    this.filePath = filePath;
  }

  public static getInstance(filePath: string): LogParser {
    if (!LogParser.instance) {
      LogParser.instance = new LogParser(filePath);
      LogParser.instance.games = LogParser.instance.parse();
      // eslint-disable-next-line no-undef
      console.log("LogParser instance created and file parsed.");
    }
    return LogParser.instance;
  }

  private parse(): Game[] {
    const fileContent = fs.readFileSync(this.filePath, "utf8");
    const lines = fileContent.split("\n");
    let currentGame: Game | null = null;

    const handlers: Record<string, (line: string) => void> = {
      "InitGame:": () => {
        if (currentGame) this.games.push(currentGame); // Finaliza o jogo atual
        currentGame = {
          id: this.games.length + 1,
          totalKills: 0,
          players: [],
          kills: {},
        };
      },
      "ShutdownGame:": () => {
        if (currentGame) this.games.push(currentGame); // Finaliza o jogo atual
        currentGame = null;
      },
      "ClientUserinfoChanged:": (line) => {
        if (!currentGame) return;
        const name = this.extractPlayerName(line);
        if (!currentGame.players.includes(name)) {
          currentGame.players.push(name);
          currentGame.kills[name] = 0;
        }
      },
      "Kill:": (line) => {
        if (currentGame) this.processKill(line, currentGame);
      },
    };

    lines.forEach((line) => {
      const handlerKey = Object.keys(handlers).find((key) =>
        line.includes(key),
      );
      if (handlerKey) handlers[handlerKey](line);
    });

    if (currentGame) this.games.push(currentGame); // Finaliza último jogo, se necessário
    return this.games;
  }

  private extractPlayerName(line: string): string {
    const regex = /n\\([^\\]+)\\t\\/;
    const match = regex.exec(line);
    return match ? match[1] : "unknown";
  }

  private processKill(line: string, game: Game): void {
    if (!game) return;

    const killerRegex = /:\s+\d+\s+\d+\s+\d+:\s+(.*?)\s+killed/;
    const killedRegex = /killed\s+(.*?)\s+by/;
    const killerMatch = line.match(killerRegex);
    const killedMatch = line.match(killedRegex);

    const killerName = killerMatch ? killerMatch[1] : null;
    const killedName = killedMatch ? killedMatch[1] : null;

    const isWorld = killerName === "<world>";

    if (!isWorld && killerName && game.kills[killerName] !== undefined) {
      game.kills[killerName]++;
    } else if (killedName && game.kills[killedName] !== undefined) {
      game.kills[killedName]--;
    }

    game.totalKills++;
  }

  public getGames(): Game[] {
    return this.games;
  }
}
