import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const BOARD_PX = 640;

export default function FancyChessboard() {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [squareStyles, setSquareStyles] = useState({});

  const markSquares = (move) => {
    const styles = {
      [move.from]: { className: "last-move" },
      [move.to]:   { className: "last-move" },
    };
    if (game.in_check()) {
      const kingSq = game.turn() === "w" ? game.king_square("w")
                                         : game.king_square("b");
      styles[kingSq] = { className: "in-check" };
    }
    setSquareStyles(styles);
  };

  const makeMove = (from, to) => {
    const move = game.move({ from, to, promotion: "q" });
    if (!move) return false;
    setFen(game.fen());
    markSquares(move);
    return true;
  };

  const darkSq  = { backgroundImage:
        "linear-gradient(135deg, theme(colors.woodDark) 0%, theme(colors.slateDark) 100%)" };
  const lightSq = { backgroundImage:
        "linear-gradient(135deg, theme(colors.woodLight) 0%, theme(colors.slateLight) 100%)" };

  return (
    <div className="flex justify-center items-center h-full">
      <div style={{ width: BOARD_PX }}
           className="p-4 rounded-2xl backdrop-blur-md bg-white/5 shadow-board">
        <Chessboard
          id="InstantBoard"
          position={fen}
          onPieceDrop={makeMove}
          boardWidth={BOARD_PX}
          customBoardStyle={{ borderRadius: "0.75rem" }}
          darkSquareStyle={darkSq}
          lightSquareStyle={lightSq}
          customSquareStyles={squareStyles}
          animationDuration={200}
        />
      </div>
    </div>
  );
}
