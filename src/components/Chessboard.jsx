import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function ChessboardComponent() {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());

  const makeMove = (from, to) => {
    const move = game.move({ from, to, promotion: "q" });
    if (move) setFen(game.fen());
    return !!move;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
      <div className="w-[90vw] max-w-md">
        <Chessboard position={fen} onPieceDrop={(from, to) => makeMove(from, to)} />
      </div>
    </div>
  );
}
