import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="square w-16 h-16 border-2 border-gray-800 bg-white text-xl font-bold flex items-center justify-center cursor-pointer transition-all hover:bg-gray-200"
    >
      {value}
    </button>
  );
}

function Board() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  
  const currentSquares = history[currentMove];

  function handleClick(i) {
    const nextHistory = history.slice(0, currentMove + 1);
    const nextSquares = currentSquares.slice();

    // Cek apakah sudah ada pemenang atau kotak sudah terisi
    if (currentSquares[i] || calculateWinner(currentSquares)) {
      return;
    }

    // Tentukan giliran
    nextSquares[i] = xIsNext ? "X" : "O";

    // Update state
    setHistory([...nextHistory, nextSquares]);
    setCurrentMove(nextHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setCurrentMove(step);
    setXIsNext(step % 2 === 0);
  }

  const winner = calculateWinner(currentSquares);
  const moves = history.map((squares, move) => {
    const desc = move ? `Go to move ` : "Go to game start";
    return (
      <li key={move} className="mb-2">
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700 transition"
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="status text-2xl font-bold mb-4">{status}</div>
      <div className="container grid grid-cols-3 gap-2">
        <Square value={currentSquares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={currentSquares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={currentSquares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={currentSquares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={currentSquares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={currentSquares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={currentSquares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={currentSquares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={currentSquares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="history mt-4">
        <ol className="list-disc list-inside">{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
