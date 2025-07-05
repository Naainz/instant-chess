import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";

const BOARD_PX = 640;

export default function FancyChessboard({ game }) {
  const [squareStyles, setSquareStyles] = useState({});
  const { fen, onMove, currentTurn, game: chessGame } = game;

  const markSquares = (move) => {
    const styles = {
      [move.from]: { className: "last-move" },
      [move.to]: { className: "last-move" },
    };
    
    if (chessGame.in_check()) {
      const board = chessGame.board();
      const kingPos = board.flat().findIndex(sq => 
        sq && sq.type === 'king' && sq.color === chessGame.turn()
      );
      
      if (kingPos >= 0) {
        const file = 'abcdefgh'[kingPos % 8];
        const rank = 8 - Math.floor(kingPos / 8);
        styles[`${file}${rank}`] = { className: "in-check" };
      }
    }
    
    setSquareStyles(styles);
  };

  const makeMove = (from, to) => {
    try {
      const move = {
        from,
        to,
        promotion: 'q'
      };
      
      const result = chessGame.move(move);
      
      if (!result) return false;
      
      markSquares(result);
      onMove(result);
      return true;
    } catch (e) {
      console.error('Move error:', e);
      return false;
    }
  };

  const darkSq  = { backgroundImage:
        "linear-gradient(135deg, theme(colors.woodDark) 0%, theme(colors.slateDark) 100%)" };
  const lightSq = { backgroundImage:
        "linear-gradient(135deg, theme(colors.woodLight) 0%, theme(colors.slateLight) 100%)" };

  return (
    <div className="flex justify-center items-center h-full">
      <div style={{ width: BOARD_PX }} className="p-4 rounded-2xl backdrop-blur-md bg-white/5 shadow-board">
        <Chessboard
          id="InstantBoard"
          position={fen}
          onPieceDrop={makeMove}
          boardWidth={BOARD_PX}
          customBoardStyle={{ borderRadius: "0.75rem" }}
          darkSquareStyle={{ backgroundColor: '#b58863' }}
          lightSquareStyle={{ backgroundColor: '#f0d9b5' }}
          customSquareStyles={squareStyles}
          animationDuration={200}
          boardOrientation={currentTurn === 'white' ? 'white' : 'black'}
        />
      </div>
    </div>
  );
}
