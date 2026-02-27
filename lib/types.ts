// Vietnamese Historical Jungle Game Types (1930-1945)

export enum Faction {
  REVOLUTION = 'revolution', // Red - Revolutionary forces under Ho Chi Minh
  COLONIAL = 'colonial', // Blue - French colonial and Japanese fascist forces
}

export enum Rank {
  Peasant = 1, // Nông dân (can trap Leader on land)
  Worker = 2, // Công nhân
  Youth = 3, // Thanh niên cứu quốc
  Liaison = 4, // Giao liên
  Guerrilla = 5, // Du kích địa phương
  MainForce = 6, // Đội vũ trang chủ lực
  Commander = 7, // Chỉ huy quân sự
  Leader = 8, // Lãnh đạo tối cao
}

export const RankNames: Record<Rank, string> = {
  [Rank.Peasant]: 'Dân quân',
  [Rank.Worker]: 'Hậu cần',
  [Rank.Youth]: 'Trinh sát',
  [Rank.Liaison]: 'Liên lạc',
  [Rank.Guerrilla]: 'Chiến binh',
  [Rank.MainForce]: 'Đặc nhiệm',
  [Rank.Commander]: 'Chỉ huy',
  [Rank.Leader]: 'Thủ lĩnh',
};

export enum SquareType {
  NORMAL = 'normal',
  LAIR = 'lair', // Phủ Toàn quyền (winning location)
  TRAP = 'trap', // Nhà tù (Côn Đảo/Hỏa Lò - reduces rank to 0)
  SECRET_BASE = 'secret_base', // Vùng căn cứ bí mật (only certain units can enter)
}

export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  id: string;
  faction: Faction;
  rank: Rank;
  position: Position;
  isTrapped: boolean; // Bị bắt (rank 0)
  capturedBy?: Faction; // Which faction's trap has captured this piece
}

export interface GameState {
  board: (Piece | null)[][];
  pieces: Record<Faction, Piece[]>;
  currentPlayer: Faction;
  selectedPiece: Piece | null;
  validMoves: Position[];
  gameStatus: 'active' | 'won' | 'lost' | 'draw';
  winner?: Faction;
  moveHistory: GameMove[];
  history: Omit<GameState, "history">[];
  message: string;
}

export interface GameMove {
  piece: Piece;
  from: Position;
  to: Position;
  capturedPiece?: Piece;
  timestamp: number;
}

export const BOARD_WIDTH = 7;
export const BOARD_HEIGHT = 9;

// Special square positions
export const LAIR_POSITIONS: Record<Faction, Position> = {
  [Faction.REVOLUTION]: { x: 3, y: 0 },
  [Faction.COLONIAL]: { x: 3, y: 8 },
};

export const TRAP_POSITIONS: Record<Faction, Position[]> = {
  [Faction.REVOLUTION]: [
    { x: 2, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 0 },
  ],
  [Faction.COLONIAL]: [
    { x: 2, y: 8 },
    { x: 3, y: 7 },
    { x: 4, y: 8 },
  ],
};

export const SECRET_BASE_POSITIONS = [
  { x: 1, y: 3 },
  { x: 1, y: 4 },
  { x: 1, y: 5 },
  { x: 2, y: 3 },
  { x: 2, y: 4 },
  { x: 2, y: 5 },
  { x: 5, y: 3 },
  { x: 5, y: 4 },
  { x: 5, y: 5 },
  { x: 4, y: 3 },
  { x: 4, y: 4 },
  { x: 4, y: 5 },
];

export const INITIAL_SETUP: Record<Faction, Rank[]> = {
  [Faction.REVOLUTION]: [
    Rank.Leader, // 0: (0, 2)
    Rank.Commander, // 1: (6, 0)
    Rank.MainForce, // 2: (0, 0)
    Rank.Guerrilla, // 3: (4, 2)
    Rank.Liaison, // 4: (5, 1)
    Rank.Youth, // 5: (2, 2)
    Rank.Worker, // 6: (1, 1)
    Rank.Peasant, // 7: (6, 2)
  ],
  [Faction.COLONIAL]: [
    Rank.Leader, // 0: (0, 6) - đối xứng
    Rank.Commander, // 1: (6, 8) - đối xứng
    Rank.MainForce, // 2: (0, 8) - đối xứng
    Rank.Guerrilla, // 3: (4, 6) - đối xứng
    Rank.Liaison, // 4: (5, 7) - đối xứng
    Rank.Youth, // 5: (2, 6) - đối xứng
    Rank.Worker, // 6: (1, 7) - đối xứng
    Rank.Peasant, // 7: (6, 6) - đối xứng
  ],
};

