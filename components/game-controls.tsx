'use client';

import { Button } from '@/components/ui/button';

interface GameControlsProps {
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
  gameActive: boolean;
}

export default function GameControls({
  onReset,
  onUndo,
  canUndo,
  gameActive,
}: GameControlsProps) {
  return (
    <div className="space-y-3">
      <Button
        onClick={onReset}
        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-lg text-lg"
      >
        Ván Mới
      </Button>

      <Button
        onClick={onUndo}
        disabled={!canUndo}
        className="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg"
      >
        Lùi Nước Đi
      </Button>

      <div className="bg-amber-100 rounded-lg p-3 border-2 border-amber-800">
        <p className="text-xs font-semibold text-gray-700 mb-2">TÌNH HÌNH TRẬN ĐẤU</p>
        <p className="text-sm text-gray-800">
          {gameActive ? (
            <>
              <span className="font-bold">Đang Diễn Ra</span> - Chọn 1 quân cờ, sau đó nhấp vào ô sáng để di chuyển.
            </>
          ) : (
            <>
              <span className="font-bold">Trận Đấu Kết Thúc</span> - Bắt đầu ván mới để tiếp tục chơi.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
