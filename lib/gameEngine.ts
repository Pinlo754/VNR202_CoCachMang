import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  Faction,
  GameMove,
  GameState,
  INITIAL_SETUP,
  LAIR_POSITIONS,
  Piece,
  Position,
  Rank,
  RankNames,
  SECRET_BASE_POSITIONS,
  SquareType,
  TRAP_POSITIONS,
} from './types';

export class JungleGameEngine {
  static initializeGame(): GameState {
    const board: (Piece | null)[][] = Array.from({ length: BOARD_HEIGHT }, () =>
      Array(BOARD_WIDTH).fill(null)
    );

    const pieces: Record<Faction, Piece[]> = {
      [Faction.REVOLUTION]: [],
      [Faction.COLONIAL]: [],
    };

    const initialPositions: Record<Faction, Position[]> = {
      [Faction.REVOLUTION]: [
        { x: 0, y: 2 }, // Leader
        { x: 6, y: 0 }, // Commander
        { x: 0, y: 0 }, // MainForce
        { x: 4, y: 2 }, // Guerrilla
        { x: 5, y: 1 }, // Liaison
        { x: 2, y: 2 }, // Youth
        { x: 1, y: 1 }, // Worker
        { x: 6, y: 2 }, // Peasant
      ],
      [Faction.COLONIAL]: [
        { x: 6, y: 6 }, // Leader
        { x: 0, y: 8 }, // Commander
        { x: 6, y: 8 }, // MainForce
        { x: 2, y: 6 }, // Guerrilla
        { x: 1, y: 7 }, // Liaison
        { x: 4, y: 6 }, // Youth
        { x: 5, y: 7 }, // Worker
        { x: 0, y: 6 }, // Peasant
      ],
    };

    let pieceId = 0;
    for (const faction of [Faction.REVOLUTION, Faction.COLONIAL]) {
      const ranks = INITIAL_SETUP[faction];
      const positions = initialPositions[faction];

      for (let i = 0; i < ranks.length; i++) {
        const piece: Piece = {
          id: `${faction}-${pieceId++}`,
          faction,
          rank: ranks[i],
          position: positions[i],
          isTrapped: false,
        };
        pieces[faction].push(piece);
        board[positions[i].y][positions[i].x] = piece;
      }
    }

    return {
      board,
      pieces,
      currentPlayer: Faction.REVOLUTION,
      selectedPiece: null,
      validMoves: [],
      gameStatus: 'active',
      moveHistory: [],
      history: [],
      message: 'Trận đấu bắt đầu. Kháng Chiến (Đỏ) đi trước.',
    };
  }

  static getSquareType(pos: Position, faction?: Faction): SquareType {
    if (faction && this.isLairPosition(pos, faction)) {
      return SquareType.LAIR;
    }
    if (faction && this.isTrapPosition(pos, faction)) {
      return SquareType.TRAP;
    }
    if (this.isSecretBasePosition(pos)) {
      return SquareType.SECRET_BASE;
    }
    return SquareType.NORMAL;
  }

  static isLairPosition(pos: Position, faction: Faction): boolean {
    const lair = LAIR_POSITIONS[faction];
    return pos.x === lair.x && pos.y === lair.y;
  }

  static isTrapPosition(pos: Position, faction: Faction): boolean {
    return TRAP_POSITIONS[faction].some((trap) => trap.x === pos.x && trap.y === pos.y);
  }

  static isSecretBasePosition(pos: Position): boolean {
    return SECRET_BASE_POSITIONS.some((base) => base.x === pos.x && base.y === pos.y);
  }

  static isInBounds(pos: Position): boolean {
    return pos.x >= 0 && pos.x < BOARD_WIDTH && pos.y >= 0 && pos.y < BOARD_HEIGHT;
  }

  static canPieceEnterSecretBase(piece: Piece): boolean {
    return piece.rank === Rank.Peasant || piece.rank === Rank.Liaison;
  }

  static canRiverJump(
    piece: Piece,
    from: Position,
    to: Position,
    board: (Piece | null)[][]
  ): boolean {
    if (piece.rank !== Rank.Commander && piece.rank !== Rank.MainForce) {
      return false;
    }

    const dx = Math.sign(to.x - from.x);
    const dy = Math.sign(to.y - from.y);

    // Chỉ cho nhảy ngang hoặc dọc
    if (!((dx === 0 && dy !== 0) || (dx !== 0 && dy === 0))) {
      return false;
    }

    let x = from.x + dx;
    let y = from.y + dy;

    let crossedRiver = false;

    while (x !== to.x || y !== to.y) {
      const pos = { x, y };

      // Phải là SECRET_BASE
      if (!this.isSecretBasePosition(pos)) {
        return false;
      }

      crossedRiver = true;

      // Peasant chặn nhảy
      const blockingPiece = board[y][x];
      if (blockingPiece && blockingPiece.rank === Rank.Peasant) {
        return false;
      }

      x += dx;
      y += dy;
    }

    return crossedRiver;
  }

  static getValidMoves(piece: Piece, board: (Piece | null)[][]): Position[] {
    const { x, y } = piece.position;
    const moves: Position[] = [];

    const basicMoves = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ];

    for (const move of basicMoves) {
      if (!this.isInBounds(move)) continue;

      const targetSquareType = this.getSquareType(move, piece.faction === Faction.REVOLUTION ? Faction.COLONIAL : Faction.REVOLUTION);
      const targetPiece = board[move.y][move.x];

      // Can't move to own lair
      if (this.isLairPosition(move, piece.faction)) continue;

      // Secret base restriction - only peasants and liaisons can enter
      if (targetSquareType === SquareType.SECRET_BASE) {
        if (this.canPieceEnterSecretBase(piece)) {
          moves.push(move);
        }
        continue;
      }

      // Non-peasants/liaisons cannot enter secret bases, can move normally elsewhere
      moves.push(move);
    }

    // Thêm nhảy sông cho Commander và MainForce
    if (piece.rank === Rank.Commander || piece.rank === Rank.MainForce) {

      if (piece.rank === Rank.Commander || piece.rank === Rank.MainForce) {

        if (piece.rank === Rank.Commander || piece.rank === Rank.MainForce) {

          if (piece.rank === Rank.Commander || piece.rank === Rank.MainForce) {
            const directions = [
              { dx: 1, dy: 0 },
              { dx: -1, dy: 0 },
              { dx: 0, dy: 1 },
              { dx: 0, dy: -1 },
            ];

            for (const { dx, dy } of directions) {
              let nx = x + dx;
              let ny = y + dy;

              // Phải đứng sát mép vùng
              if (!this.isInBounds({ x: nx, y: ny })) continue;
              if (!this.isSecretBasePosition({ x: nx, y: ny })) continue;

              // Đi xuyên qua toàn bộ vùng SECRET_BASE
              while (
                this.isInBounds({ x: nx, y: ny }) &&
                this.isSecretBasePosition({ x: nx, y: ny })
              ) {
                nx += dx;
                ny += dy;
              }

              // 👉 Lúc này nx,ny đã là ô đầu tiên ngoài vùng
              const landing = { x: nx, y: ny };

              if (!this.isInBounds(landing)) continue;
              if (this.isLairPosition(landing, piece.faction)) continue;

              if (!this.canRiverJump(piece, piece.position, landing, board)) continue;

              const targetPiece = board[landing.y][landing.x];
              if (targetPiece && targetPiece.faction === piece.faction) continue;

              moves.push(landing);
              console.log("Landing:", landing);
            }
          }

        }
      }

    }

    return moves;
  }

  static canCapture(attacker: Piece, defender: Piece): boolean {
    // If attacker is trapped (rank 0), can't capture
    if (attacker.isTrapped) return false;

    // If defender is trapped (rank 0), anyone can capture
    if (defender.isTrapped) return true;

    // Peasant can capture Leader anywhere
    if (attacker.rank === Rank.Peasant && defender.rank === Rank.Leader) {
      return true;
    }

    // Leader can't be captured by Peasant normally
    if (defender.rank === Rank.Leader && attacker.rank === Rank.Peasant) {
      return false;
    }

    // Otherwise, equal or higher rank can capture lower rank
    return attacker.rank >= defender.rank;
  }

  static movePiece(
    state: GameState,
    piece: Piece,
    toPos: Position
  ): GameState {
    // Prevent moves after game ends
    if (state.gameStatus !== 'active') {
      return state;
    }

    if (piece.faction !== state.currentPlayer) {
      return {
        ...state,
        message: "Chưa đến lượt bạn!",
      };
    }

    const newBoard = state.board.map((row) => [...row]);
    const targetSquareType = this.getSquareType(
      toPos,
      piece.faction === Faction.REVOLUTION ? Faction.COLONIAL : Faction.REVOLUTION
    );

    let capturedPiece: Piece | undefined;
    let newPieces = state.pieces;

    // Check if there's a piece at target position
    const targetPiece = newBoard[toPos.y][toPos.x];
    if (targetPiece && targetPiece.faction !== piece.faction) {
      // Attempt capture
      if (!this.canCapture(piece, targetPiece)) {
        return {
          ...state,
          message: `${RankNames[piece.rank]} không thể bắt ${RankNames[targetPiece.rank]}!`,
        };
      }
      capturedPiece = targetPiece;

      // Remove captured piece
      newPieces = {
        ...newPieces,
        [targetPiece.faction]: newPieces[targetPiece.faction].filter(
          (p) => p.id !== targetPiece.id
        ),
      };
    } else if (targetPiece) {
      return {
        ...state,
        message: 'Không thể di chuyển đến ô có quân của bạn!',
      };
    }

    // Move piece
    newBoard[piece.position.y][piece.position.x] = null;

    // Update piece position and trap status
    const movedPiece = { ...piece, position: toPos };

    if (targetSquareType === SquareType.TRAP) {
      movedPiece.isTrapped = true;
      movedPiece.capturedBy = piece.faction === Faction.REVOLUTION ? Faction.COLONIAL : Faction.REVOLUTION;
    } else if (movedPiece.isTrapped && targetSquareType !== SquareType.TRAP) {
      movedPiece.isTrapped = false;
      movedPiece.capturedBy = undefined;
    }

    newBoard[toPos.y][toPos.x] = movedPiece;

    // Update pieces array
    const updatedPieces = {
      ...newPieces,
      [piece.faction]: newPieces[piece.faction].map((p) =>
        p.id === piece.id ? movedPiece : p
      ),
    };

    // Check win conditions
    let gameStatus: 'active' | 'won' | 'lost' | 'draw' = 'active';
    let winner: Faction | undefined;
    let message = '';

    // Win condition 1: Reach opponent's lair
    const opponentFaction = piece.faction === Faction.REVOLUTION ? Faction.COLONIAL : Faction.REVOLUTION;
    if (this.isLairPosition(toPos, opponentFaction)) {
      gameStatus = 'won';
      winner = piece.faction;
      message = `${piece.faction === Faction.REVOLUTION ? 'Kháng Chiến' : 'Chính Quyền Bảo Hộ'} chiếm được Phu Toàn Quyền! Chiến thắng!`;
    }

    // Win condition 2: All opponent pieces captured
    if (updatedPieces[opponentFaction].length === 0) {
      gameStatus = 'won';
      winner = piece.faction;
      message = `Tiêu diệt hết tất cả quân đối phương! ${piece.faction === Faction.REVOLUTION ? 'Kháng Chiến' : 'Chính Quyền Bảo Hộ'} chiến thắng!`;
    }

    const move: GameMove = {
      piece: movedPiece,
      from: piece.position,
      to: toPos,
      capturedPiece,
      timestamp: Date.now(),
    };
    const { history: _ignored, ...snapshot } = state;
    return {
      board: newBoard,
      pieces: updatedPieces,
      currentPlayer: opponentFaction,
      selectedPiece: null,
      validMoves: [],
      gameStatus,
      winner,
      moveHistory: [...state.moveHistory, move],
      history: [
        ...state.history,
        snapshot // ✅ không còn field history bên trong
      ],
      message: message || `${RankNames[piece.rank]} di chuyển. Lượt của ${opponentFaction === Faction.REVOLUTION ? 'Kháng Chiến (Đỏ)' : 'Chính Quyền Bảo Hộ (Xanh)'}.`,
    };
  }

  static selectPiece(state: GameState, piece: Piece | null): GameState {
    // Prevent selecting pieces after game ends
    if (state.gameStatus !== 'active') {
      return state;
    }

    if (piece && piece.faction !== state.currentPlayer) {
      return {
        ...state,
        message: "Đó không phải quân của bạn!",
      };
    }

    const validMoves = piece ? this.getValidMoves(piece, state.board) : [];

    return {
      ...state,
      selectedPiece: piece,
      validMoves,
    };
  }
}
