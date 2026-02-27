'use client';

import { Faction, Piece, Rank, RankNames } from '@/lib/types';

interface GamePieceProps {
  piece: Piece;
  onClick?: () => void;
}

export default function GamePiece({ piece, onClick }: GamePieceProps) {
  const getUnitEmoji = (rank: Rank): string => {
    switch (rank) {
      case Rank.Peasant:
        return '👨‍🌾';
      case Rank.Worker:
        return '👷';
      case Rank.Youth:
        return '👨‍🎓';
      case Rank.Liaison:
        return '📟';
      case Rank.Guerrilla:
        return '🎯';
      case Rank.MainForce:
        return '🪖';
      case Rank.Commander:
        return '🎖️';
      case Rank.Leader:
        return '👑';
      default:
        return '⚪';
    }
  };

  const factionColor =
    piece.faction === Faction.REVOLUTION ? 'bg-red-600' : 'bg-blue-600';
  const factionBorder =
    piece.faction === Faction.REVOLUTION ? 'border-red-900' : 'border-blue-900';

  return (
    <div
      onClick={onClick}
      className={`
        w-14 h-14 rounded-full flex flex-col items-center justify-center
        border-2 ${factionBorder} ${factionColor} text-white font-bold
        shadow-lg hover:shadow-xl transition-shadow cursor-pointer
        relative z-10
        ${piece.isTrapped ? 'opacity-50' : ''}
      `}
      title={`${RankNames[piece.rank]} - ${piece.faction === Faction.REVOLUTION ? 'Revolutionary' : 'Colonial'} forces`}
    >
      <div className="text-2xl">{getUnitEmoji(piece.rank)}</div>
      {piece.isTrapped && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full border-4 border-yellow-300 opacity-75" />
          <div className="absolute text-lg">🔗</div>
        </div>
      )}
    </div>
  );
}
