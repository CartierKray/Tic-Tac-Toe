import { useEffect, useState, useCallback } from "react";
import Cell from "./components/Cell";

const App = () => {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState(null);
  const message = "it is now " + go + "'s go.";

  const checkScore = useCallback(() => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    winningCombos.forEach((array) => {
      let circleWins = array.every((cell) => cells[cell] === "circle");
      if (circleWins) {
        setWinningMessage(<b>Circle Wins!</b>);
        return;
      }
    });

    winningCombos.forEach((array) => {
      let crossWins = array.every((cell) => cells[cell] === "cross");
      if (crossWins) {
        setWinningMessage(<b>Cross Wins!</b>);
        return;
      }
    });
  }, [cells]);

  useEffect(() => {
    checkScore();
  }, [cells, checkScore]);

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            cell={cell}
            cells={cells}
            setCells={setCells}
            go={go}
            setGo={setGo}
            winningMessage={winningMessage}
          />
        ))}
      </div>
      <p>{winningMessage || message}</p>
    </div>
  );
};

export default App;
