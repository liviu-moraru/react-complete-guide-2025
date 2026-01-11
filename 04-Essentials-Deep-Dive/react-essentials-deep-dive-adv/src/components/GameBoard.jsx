import { useState } from "react";
const gameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard({ onSelectSquare, turns }) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // function handleSelectSquare(rowIndex, colIndex) {
  //   setGameBoard((prevBoard) => {
  //     const updatedBoard = prevBoard.map((innerArray) => [...innerArray]);
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //
  //     return updatedBoard;
  //   });
  //   onSelectSquare();
  // }
  if (turns.length > 0) {
    const {
      square: { row, col },
      player,
    } = turns[0];
    gameBoard[row][col] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
