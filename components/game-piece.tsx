'use client';
import Image from 'next/image';
import { Faction, Piece, Rank, RankNames } from '@/lib/types';

interface GamePieceProps {
  piece: Piece;
  onClick?: () => void;
}

export default function GamePiece({ piece, onClick }: GamePieceProps) {
  
  const getImageName = (rank: Rank): string => {
  switch (rank) {
    case Rank.Leader:
      return 'ThuLinh';
    case Rank.Commander:
      return 'ChiHuy';
    case Rank.MainForce:
      return 'DacNhiem';
    case Rank.Guerrilla:
      return 'ChienBinh';
    case Rank.Liaison:
      return 'LienLac';
    case Rank.Youth:
      return 'TrinhSat';
    case Rank.Worker:
      return 'HauCan';
    case Rank.Peasant:
      return 'DanQuan';
    default:
      return 'DanQuan';
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
      w-14 h-14 rounded-full
       ${factionBorder} ${factionColor}
      shadow-lg hover:shadow-xl transition-shadow cursor-pointer
      relative overflow-hidden
      ${piece.isTrapped ? 'opacity-50' : ''}
    `}
    title={`${RankNames[piece.rank]} - ${
      piece.faction === Faction.REVOLUTION ? 'Revolutionary' : 'Colonial'
    } forces`}
  >
    <Image
      src={`/${getImageName(piece.rank)}.png`}
      alt={RankNames[piece.rank]}
      fill
      className="object-cover"
    />

    {piece.isTrapped && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full rounded-full border-4 border-yellow-300 opacity-75" />
        <div className="absolute text-lg">🔗</div>
      </div>
    )}
  </div>
);
}
