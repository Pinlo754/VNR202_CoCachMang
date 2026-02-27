'use client';

import { Faction, GameState } from '@/lib/types';

interface GameInfoProps {
  gameState: GameState;
}

export default function GameInfo({ gameState }: GameInfoProps) {
  const revolutionPieces = gameState.pieces[Faction.REVOLUTION];
  const colonialPieces = gameState.pieces[Faction.COLONIAL];

  const getStatusColor = () => {
    if (gameState.gameStatus !== 'active') {
      return 'text-purple-600';
    }
    return gameState.currentPlayer === Faction.REVOLUTION
      ? 'text-red-600'
      : 'text-blue-600';
  };

  const getPlayerName = (faction: Faction) => {
    return faction === Faction.REVOLUTION
      ? 'Kháng chiến'
      : 'Chính quyền bảo hộ';
  };

  return (
    <div className="space-y-4">
      {/* Current Turn */}
      <div className="bg-white rounded-lg p-4 shadow-md border-2 border-amber-900">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">LƯỢT CHƠI HIỆN TẠI</h3>
        <div className={`text-lg font-bold ${getStatusColor()}`}>
          {gameState.gameStatus === 'active'
            ? `${getPlayerName(gameState.currentPlayer)}`
            : `TRẬN ĐẤU KẾT THÚC - ${gameState.winner ? getPlayerName(gameState.winner) : 'Hòa'} Thắng!`}
        </div>
      </div>

      {/* Message */}
      <div className="bg-amber-100 rounded-lg p-4 shadow-md border-2 border-amber-800">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">TÌNH TRẠNG</h3>
        <p className="text-sm text-gray-800 italic">{gameState.message}</p>
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-2 gap-3">
        {/* Red Player */}
        <div className="bg-red-600 text-white rounded-lg p-3 shadow-md">
          <div className="text-xs font-semibold mb-2">KHÁNG CHIẾN</div>
          <div className="text-2xl font-bold">{revolutionPieces.length}</div>
          <div className="text-xs opacity-90">quân còn lại</div>
        </div>

        {/* Blue Player */}
        <div className="bg-blue-600 text-white rounded-lg p-3 shadow-md">
          <div className="text-xs font-semibold mb-2">CHÍNH QUYỀN BẢO HỘ</div>
          <div className="text-2xl font-bold">{colonialPieces.length}</div>
          <div className="text-xs opacity-90">quân còn lại</div>
        </div>
      </div>

      {/* Move Count */}
      <div className="bg-gray-700 text-white rounded-lg p-3 shadow-md border-2 border-gray-600">
        <div className="text-xs font-semibold mb-1">TỔNG SỐ NƯỚC ĐI</div>
        <div className="text-xl font-bold">{gameState.moveHistory.length}</div>
      </div>
    </div>
  );
}
