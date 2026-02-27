'use client';

import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  Faction,
  GameState,
  Piece,
  Position,
  SquareType,
} from '@/lib/types';
import { JungleGameEngine } from '@/lib/gameEngine';
import GameSquare from './game-square';

interface GameBoardProps {
  gameState: GameState;
  onSquareClick: (piece: Piece | null, pos: Position) => void;
}

export default function GameBoard({ gameState, onSquareClick }: GameBoardProps) {
  const getPieceAtPosition = (x: number, y: number): Piece | null => {
    return gameState.board[y]?.[x] || null;
  };

  const getSquareType = (x: number, y: number): SquareType => {
    const pos = { x, y };

    if (JungleGameEngine.isLairPosition(pos, Faction.REVOLUTION)) {
      return SquareType.LAIR;
    }
    if (JungleGameEngine.isLairPosition(pos, Faction.COLONIAL)) {
      return SquareType.LAIR;
    }
    if (
      JungleGameEngine.isTrapPosition(pos, Faction.REVOLUTION) ||
      JungleGameEngine.isTrapPosition(pos, Faction.COLONIAL)
    ) {
      return SquareType.TRAP;
    }
    if (JungleGameEngine.isSecretBasePosition(pos)) {
      return SquareType.SECRET_BASE;
    }
    return SquareType.NORMAL;
  };

  const isValidMove = (x: number, y: number): boolean => {
    return gameState.validMoves.some((move) => move.x === x && move.y === y);
  };

  const isSelected = (x: number, y: number): boolean => {
    return (
      gameState.selectedPiece?.position.x === x &&
      gameState.selectedPiece?.position.y === y
    );
  };

  return (
    <div className="flex justify-center items-start p-4 bg-amber-950 rounded-lg shadow-2xl border-8 border-amber-900">
      <div
        className="inline-grid gap-0 border-4 border-amber-900"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
        }}
      >
        {Array.from({ length: BOARD_HEIGHT }).map((_, y) =>
          Array.from({ length: BOARD_WIDTH }).map((_, x) => {
            const piece = getPieceAtPosition(x, y);
            const squareType = getSquareType(x, y);
            const isValid = isValidMove(x, y);
            const isSelectedSquare = isSelected(x, y);

            return (
              <GameSquare
                key={`${x}-${y}`}
                x={x}
                y={y}
                piece={piece}
                squareType={squareType}
                isValidMove={isValid}
                isSelected={isSelectedSquare}
                onClick={() => onSquareClick(piece, { x, y })}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
