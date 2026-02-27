'use client';

import { Button } from '@/components/ui/button';
import { Faction } from '@/lib/types';

interface GameResultProps {
  winner: Faction | undefined;
  onRestart: () => void;
}

export function GameResult({ winner, onRestart }: GameResultProps) {
  const isRevolution = winner === Faction.REVOLUTION;
  const factionalName = isRevolution ? 'Kháng Chiến' : 'Chính Quyền Bảo Hộ';
  const factionalColor = isRevolution ? 'from-red-600 to-red-800' : 'from-blue-600 to-blue-800';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className={`bg-gradient-to-b ${factionalColor} rounded-lg shadow-2xl p-8 max-w-md w-full text-white text-center border-4 border-amber-900`}>
        {/* Victory Banner */}
        <div className="mb-6">
          <div className="text-6xl font-bold mb-2">⚔️</div>
          <h1 className="text-4xl font-bold mb-2">CHIẾN THẮNG!</h1>
          <p className="text-2xl font-semibold text-amber-100">{factionalName}</p>
        </div>

        {/* Result Details */}
        <div className="bg-black/40 rounded-lg p-4 mb-6 border-2 border-amber-700">
          <div className="text-lg mb-2">
            {isRevolution ? (
              <p>Kháng Chiến đã chiến thắng!</p>
            ) : (
              <p>Chính Quyền Bảo Hộ đã chiến thắng!</p>
            )}
          </div>
          <p className="text-sm text-amber-100">
            {isRevolution
              ? 'Kháng Chiến chiến thắng, Việt Nam độc lập!'
              : 'Chính Quyền Bảo Hộ bảo vệ được pháo đài'}
          </p>
        </div>

        {/* Restart Button */}
        <Button
          onClick={onRestart}
          className={`w-full py-4 text-lg font-bold rounded-lg transition-transform hover:scale-105 ${
            isRevolution
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          Chơi Ván Mới
        </Button>
      </div>
    </div>
  );
}
