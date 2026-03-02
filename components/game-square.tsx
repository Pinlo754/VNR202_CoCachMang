'use client';

import { Piece, SquareType } from '@/lib/types';
import GamePiece from './game-piece';
import { cn } from '@/lib/utils';
import Image from 'next/image';
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

  const getSecretBaseIndex = () => {
  const row = y - 3; // 0 → 2
  if (row < 0 || row > 2) return null;

  // Xác định vùng trái
  if (x === 1) return row + 1;
  if (x === 2) return 6 - row;

  // Xác định vùng phải
  if (x === 4) return row + 1;
  if (x === 5) return 6 - row;

  return null;
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
        <Image
          src={`/NhaTu.jpg`}
          alt={`/NhaTu.jpg`}
          fill
          className="object-cover"
        />
      )}
      {squareType === SquareType.SECRET_BASE && (
        <Image
          src={`/DiaDao${getSecretBaseIndex()}.png`}
          alt={`/DiaDao${getSecretBaseIndex()}.png`}
          fill
          className="object-cover"
        />
      )}

      {/* Piece on square */}
      {piece && <GamePiece piece={piece} />}
    </div>
  );
}
