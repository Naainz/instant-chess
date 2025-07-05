import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import clsx from 'clsx';

export default function ChessboardComponent() {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [squareStyles, setSquareStyles] = useState({});

  /* highlights last move + check? */
  const markSquares = (move) => {
    const styles = {
        [move.from]: {className: 'last-move'},
        [move.to]: {className: 'last-move'},
    };
    if (game.in_check()) {
        const kingPos = game.turn() === 'w' ? game.king_square('w') : game.king_square('b');
        styles[kingPos] = {className: 'in-check'};
    }
    setSquareStyles(styles);
  }

  const makeMove = (from, to) => {
    const move = game.move({ from, to, promotion: "q" });
    if (!move) return false;
    setFen(game.fen());
    markSquares(move);
    return true;
  };

  const darkSq = {backgroundImage: 'linear-gradient(135deg, theme(colors.woodDark) 0%, theme(colors.slateDark) 100%)' };
  const lightSq = { backgroundImage: 'linear-gradient(135deg, theme(colors.woodLight) 0%, theme(colors.slateLight) 100%)' };

  return (
    <div className="relative flex min-h-screen items-center justify-center
                    bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 animate-slowspin bg-[radial-gradient(circle_at_20%_10%,rgba(93,255,234,0.12),transparent_60%)]" />

      <div className="relative p-4 rounded-2xl backdrop-blur-md bg-white/5 shadow-board">
        <Chessboard
          id="InstantBoard"
          position={fen}
          onPieceDrop={makeMove}
          boardWidth={480}
          customBoardStyle={{ borderRadius: '0.75rem' }}
          darkSquareStyle={darkSq}
          lightSquareStyle={lightSq}
          customSquareStyles={squareStyles}
          animationDuration={200}
          dropSquareStyle={{ animation: 'pop 150ms ease-out forwards' }}
        />
      </div>
    </div>
  );
}
