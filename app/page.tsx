'use client';

import { useState } from 'react';
import { Faction, GameState, Piece, Position } from '@/lib/types';
import { JungleGameEngine } from '@/lib/gameEngine';
import GameBoard from '@/components/game-board';
import GameInfo from '@/components/game-info';
import GameControls from '@/components/game-controls';
import GameRules from '@/components/game-rules';
import { GameResult } from '@/components/game-result';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(() =>
    JungleGameEngine.initializeGame()
  );
  const [showRules, setShowRules] = useState(false);

  const handleSquareClick = (piece: Piece | null, pos: Position) => {
    // If clicking on a piece from current player, select it
    if (piece && piece.faction === gameState.currentPlayer) {
      const newState = JungleGameEngine.selectPiece(gameState, piece);
      setGameState(newState);
      return;
    }

    // If there's a selected piece and clicking on valid move, move the piece
    if (
      gameState.selectedPiece &&
      gameState.validMoves.some((m) => m.x === pos.x && m.y === pos.y)
    ) {
      const newState = JungleGameEngine.movePiece(gameState, gameState.selectedPiece, pos);
      setGameState(newState);
      return;
    }

    // Otherwise deselect
    setGameState(JungleGameEngine.selectPiece(gameState, null));
  };

  const handleReset = () => {
    setGameState(JungleGameEngine.initializeGame());
    setShowRules(false);
  };

  const handleUndo = () => {
    if (!gameState.history || gameState.history.length === 0) return;

    const previousState =
      gameState.history[gameState.history.length - 1];

    setGameState({
      ...previousState,
      history: gameState.history.slice(0, -1),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-50 mb-2">
          Cờ cách mạng
        </h1>
      </div>

      {/* Game Result Modal */}
      {gameState.gameStatus !== 'active' && gameState.winner && (
        <GameResult winner={gameState.winner} onRestart={handleReset} />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {showRules ? (
          <div className="bg-white rounded-lg shadow-2xl p-6 mb-6">
            <GameRules onClose={() => setShowRules(false)} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Game Board */}
            <div className="lg:col-span-2">
              <GameBoard gameState={gameState} onSquareClick={handleSquareClick} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Game Info */}
              <GameInfo gameState={gameState} />

              {/* Controls */}
              <GameControls
                onReset={handleReset}
                onUndo={handleUndo}
                canUndo={gameState.moveHistory.length > 0}
                gameActive={gameState.gameStatus === 'active'}
              />

              {/* Rules Button */}
              <button
                onClick={() => setShowRules(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Xem Luật Chơi
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 text-amber-200 text-sm">
        <p>
          Trò chơi chiến lược 2 người chơi lấy cảm hứng từ lịch sử Việt Nam (1930-1945)
        </p>
        <p className="mt-2">
          Kháng Chiến (Đỏ) đối Chính Quyền Bảo Hộ (Xanh)
        </p>
      </footer>
    </div>
  );
}
