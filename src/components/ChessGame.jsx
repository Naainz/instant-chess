import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import Chessboard from './Chessboard';
import GameSidebar from './GameSidebar';

const ChessGame = () => {
  const [game] = useState(() => new Chess());
  const [fen, setFen] = useState(game.fen());
  const [moveHistory, setMoveHistory] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('white');
  const [gameStatus, setGameStatus] = useState('in_progress');
  const [whiteTime, setWhiteTime] = useState(300); // 5 minutes
  const [blackTime, setBlackTime] = useState(300);

  const onMove = (move) => {
    setFen(game.fen());
    setCurrentTurn(game.turn() === 'w' ? 'white' : 'black');
    setMoveHistory(game.history({ verbose: true }));
    
    if (game.isGameOver()) {
      if (game.isCheckmate()) {
        setGameStatus('checkmate');
      } else if (game.isDraw()) {
        setGameStatus('draw');
      }
    }
  };

  useEffect(() => {
    if (gameStatus !== 'in_progress') return;
    
    const timer = setInterval(() => {
      if (currentTurn === 'white') {
        setWhiteTime(prev => {
          if (prev <= 1) {
            setGameStatus('timeout');
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime(prev => {
          if (prev <= 1) {
            setGameStatus('timeout');
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentTurn, gameStatus]);

  const handleResign = () => {
    setGameStatus('resignation');
  };

  const handleDraw = () => {
    setGameStatus('draw');
  };

  const handleNewGame = () => {
    game.reset();
    setFen(game.fen());
    setMoveHistory([]);
    setCurrentTurn('white');
    setGameStatus('in_progress');
    setWhiteTime(300);
    setBlackTime(300);
  };

  const gameState = {
    game,
    fen,
    currentTurn,
    gameStatus,
    moveHistory,
    whiteTime,
    blackTime,
    onMove,
    onResign: handleResign,
    onDraw: handleDraw,
    onNewGame: handleNewGame
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <div className="w-full md:w-7/12 flex items-center justify-center p-4 bg-gray-800">
        <div className="w-full max-w-[min(80vh,calc(100vw-2rem))] aspect-square">
          <Chessboard game={gameState} />
        </div>
      </div>

      <div className="w-full md:w-5/12 bg-gray-900 border-t md:border-l border-gray-700 overflow-hidden">
        <GameSidebar game={gameState} />
      </div>
    </div>
  );
};

export default ChessGame;
