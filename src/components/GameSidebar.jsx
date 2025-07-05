import { useEffect } from 'react';

const MoveHistory = ({ moves }) => {
  const movePairs = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i]?.san || '',
      black: moves[i + 1]?.san || ''
    });
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
      <div className="grid grid-cols-12 gap-1 mb-2 text-gray-400 text-xs">
        <div className="col-span-2">#</div>
        <div className="col-span-5">White</div>
        <div className="col-span-5">Black</div>
      </div>
      <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
        {movePairs.map((pair, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-1 hover:bg-gray-700 p-1 rounded">
            <div className="col-span-2 text-gray-400">{pair.number}.</div>
            <div className="col-span-5 p-1 rounded bg-gray-700/50">{pair.white}</div>
            <div className="col-span-5 p-1 rounded bg-gray-700/50">{pair.black}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlayerInfo = ({ name, timeLeft, isActive, isWhite, rating }) => {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${
      isActive ? 'bg-blue-900/30' : 'bg-gray-800'
    }`}>
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isWhite ? 'bg-white' : 'bg-black border border-gray-400'}`}></div>
        <div>
          <div className="font-medium">{name || (isWhite ? 'White' : 'Black')}</div>
          {rating && <div className="text-xs text-gray-400">{rating} ELO</div>}
        </div>
      </div>
      <div className="font-mono bg-gray-900 px-2 py-1 rounded text-sm">
        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default function GameSidebar({ game }) {
  const {
    currentTurn,
    gameStatus,
    moveHistory,
    whiteTime,
    blackTime,
    onResign,
    onDraw,
    onNewGame
  } = game;

  const getStatusMessage = () => {
    if (gameStatus === 'in_progress') {
      return `Your move: ${currentTurn === 'white' ? 'White' : 'Black'}`;
    }
    
    if (gameStatus === 'checkmate') {
      return `Checkmate! ${currentTurn === 'white' ? 'Black' : 'White'} wins!`;
    }
    
    if (gameStatus === 'draw') {
      return 'Game drawn';
    }
    
    if (gameStatus === 'resignation') {
      return `Game over - ${currentTurn === 'white' ? 'Black' : 'White'} wins by resignation`;
    }
    
    if (gameStatus === 'timeout') {
      return `Time's up! ${currentTurn === 'white' ? 'Black' : 'White'} wins on time`;
    }
    
    return 'Game over';
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-900 text-gray-200 flex flex-col">
      <div className="p-4 space-y-4">
        {/* Player Info */}
        <PlayerInfo 
          name="You"
          timeLeft={currentTurn === 'white' ? whiteTime : blackTime}
          isActive={currentTurn === 'white'}
          isWhite={true}
          rating={1500}
        />
        
        <PlayerInfo 
          name="Opponent"
          timeLeft={currentTurn === 'black' ? blackTime : whiteTime}
          isActive={currentTurn === 'black'}
          isWhite={false}
          rating={1520}
        />
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Move History</h3>
          <MoveHistory moves={moveHistory} />
        </div>

        <div className="space-y-2 pt-4">
          <div className="flex space-x-2">
            <button 
              onClick={onResign}
              disabled={gameStatus !== 'in_progress'}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-500 text-white py-2 px-4 rounded transition-colors"
            >
              Resign
            </button>
            <button 
              onClick={onDraw}
              disabled={gameStatus !== 'in_progress'}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-700 disabled:text-gray-500 text-white py-2 px-4 rounded transition-colors"
            >
              Offer Draw
            </button>
          </div>
          <button 
            onClick={onNewGame}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            New Game
          </button>
        </div>
      </div>
      
      <div className="mt-auto p-3 bg-gray-800 text-center text-sm">
        <p className={gameStatus !== 'in_progress' ? 'font-medium text-white' : ''}>
          {getStatusMessage()}
        </p>
      </div>
    </div>
  );
}