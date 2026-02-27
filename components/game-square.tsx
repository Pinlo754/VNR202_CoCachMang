'use client';

import { Piece, SquareType } from '@/lib/types';
import GamePiece from './game-piece';
import { cn } from '@/lib/utils';

interface GameSquareProps {
  x: number;
  y: number;
  piece: Piece | null;
  squareType: SquareType;
  isValidMove: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function GameSquare({
  x,
  y,
  piece,
  squareType,
  isValidMove,
  isSelected,
  onClick,
}: GameSquareProps) {
  const getSquareColor = () => {
    if (isSelected) {
      return 'bg-yellow-400 shadow-inner';
    }
    if (isValidMove) {
      return 'bg-green-300 shadow-inner';
    }

    // Alternating board colors for checkerboard effect
    const isLight = (x + y) % 2 === 0;
    return isLight ? 'bg-amber-200' : 'bg-amber-100';
  };

  const getSpecialSquareClass = () => {
    switch (squareType) {
      case SquareType.LAIR:
        return 'border-4 border-purple-600';
      case SquareType.TRAP:
        return 'border-2 border-red-700 bg-opacity-80';
      case SquareType.SECRET_BASE:
        return 'border-2 border-blue-500 bg-opacity-90';
      default:
        return '';
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'w-16 h-16 flex items-center justify-center cursor-pointer border border-amber-800',
        'transition-all duration-150 hover:shadow-lg relative',
        getSquareColor(),
        getSpecialSquareClass()
      )}
    >
      {/* Square type indicators */}
      {squareType === SquareType.LAIR && (
        <div className="absolute top-0 right-0 w-3 h-3 bg-purple-600 rounded-full" />
      )}
      {squareType === SquareType.TRAP && (
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-red-600 to-red-900" />
      )}
      {squareType === SquareType.SECRET_BASE && (
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-400 to-blue-600" />
      )}

      {/* Piece on square */}
      {piece && <GamePiece piece={piece} />}
    </div>
  );
}
