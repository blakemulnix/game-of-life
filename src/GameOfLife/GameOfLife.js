import "./GameOfLife.css";
import Cell from "../Cell/Cell";
import Controls from "../Controls/Controls";
import { useState, useEffect } from "react";

let initialDimension = 50;
let initialGameInterval = 250;
let initialDensity = 0.2;

function Grid() {
  const [dimension, setDimension] = useState(initialDimension);
  const [gameInterval, setGameInterval] = useState(initialGameInterval);
  const [density, setDensity] = useState(initialDensity);
  const [gridState, setGridState] = useState(() => {
    return createInitialGridState(initialDimension);
  });

  function resetGame(dimension, density) {
    setGridState(createInitialGridState(dimension, density));
  }

  useEffect(() => {
    resetGame(dimension, density);
    let root = document.documentElement;
    root.style.setProperty("--num-cols", dimension);
    root.style.setProperty("--num-rows", dimension);
  }, [dimension, density]);

  useEffect(() => {
    const timer = setInterval(() => {
      setGridState(advanceGridState(gridState, dimension));
    }, gameInterval);
    return () => clearInterval(timer);
  }, [gridState, dimension, gameInterval]);

  return (
    <div className="game-of-life-container">
      <Controls
        reset={resetGame}
        setDimension={setDimension}
        dimension={dimension}
        setGameInterval={setGameInterval}
        gameInterval={gameInterval}
        density={density}
        setDensity={setDensity}
      />
      <div className="grid-container">
        <div className="grid">{createCellsFromGridState(gridState)}</div>
      </div>
    </div>
  );
}

function createInitialGridState(dimension, density) {
  let initialGridState = [];
  for (let i = 0; i < dimension; i++) {
    let row = [];
    for (let j = 0; j < dimension; j++) {
      row.push(Math.random() < density);
    }
    initialGridState.push(row);
  }
  return initialGridState;
}

function advanceGridState(currentGridState, dimension) {
  let nextGridState = [];

  for (let y = 0; y < dimension; y++) {
    let nextGridStateRow = [];

    for (let x = 0; x < dimension; x++) {
      let currentCellState = currentGridState[y][x];
      let nextCellState;
      let numAlive =
        isAlive(currentGridState, x - 1, y - 1, dimension) +
        isAlive(currentGridState, x, y - 1, dimension) +
        isAlive(currentGridState, x + 1, y - 1, dimension) +
        isAlive(currentGridState, x - 1, y, dimension) +
        isAlive(currentGridState, x + 1, y, dimension) +
        isAlive(currentGridState, x - 1, y + 1, dimension) +
        isAlive(currentGridState, x, y + 1, dimension) +
        isAlive(currentGridState, x + 1, y + 1, dimension);

      if (numAlive == 2) {
        nextCellState = currentCellState;
      } else if (numAlive == 3) {
        nextCellState = true;
      } else {
        nextCellState = false;
      }

      nextGridStateRow.push(nextCellState);
    }
    nextGridState.push(nextGridStateRow);
  }

  return nextGridState;
}

function isAlive(gridState, x, y, dimension) {
  if (x < 0 || x >= dimension || y < 0 || y >= dimension) {
    return 0;
  }

  return gridState[y][x] ? 1 : 0;
}

function createCellsFromGridState(gridState) {
  let cells = [];
  let key = 0;
  gridState.forEach((row) => {
    row.forEach((cellState) => {
      cells.push(<Cell key={key++} alive={cellState} />);
    });
  });

  return cells;
}

export default Grid;
