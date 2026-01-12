import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combination.js";
import GameOver from "./components/GameOver.jsx";

const gameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function checkWinner(board) {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    const player = board[a.row][a.column];
    if (
      player !== null &&
      player === board[b.row][b.column] &&
      player === board[c.row][c.column]
    ) {
      return player;
    }
  }
  return null;
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  if (gameTurns.length > 0) {
    const {
      square: { row, col },
      player,
    } = gameTurns[0];
    gameBoard[row][col] = player;
  }

  const winner = checkWinner(gameBoard);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      return [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} />}
        <GameBoard
          board={gameBoard}
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
        )
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;
