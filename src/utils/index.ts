import { MAX_COLUMNS, MAX_ROWS, NO_OF_BOMBS } from "../constants";
import { CellValues, CellState, Cell, AdjacentCells } from "../types";

const grabAllAdjacentCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number
): AdjacentCells => {
  const topLeftCell =
    rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
  const topCell = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
  const topRightCell =
    rowParam > 0 && colParam < MAX_COLUMNS - 1
      ? cells[rowParam - 1][colParam + 1]
      : null;
  const leftCell = colParam > 0 ? cells[rowParam][colParam - 1] : null;
  const rightCell =
    colParam < MAX_COLUMNS - 1 ? cells[rowParam][colParam + 1] : null;
  const bottomLeftCell =
    rowParam < MAX_ROWS - 1 && colParam > 0
      ? cells[rowParam + 1][colParam - 1]
      : null;
  const bottomCell =
    rowParam < MAX_ROWS - 1 ? cells[rowParam + 1][colParam] : null;
  const bottomRightCell =
    rowParam < MAX_ROWS - 1 && colParam < MAX_COLUMNS - 1
      ? cells[rowParam + 1][colParam + 1]
      : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    rightCell,
    bottomRightCell,
    bottomCell,
    bottomLeftCell,
    leftCell,
  };
};

export const generateCells = (): Cell[][] => {
  let cells: Cell[][] = [];
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLUMNS; col++) {
      cells[row].push({
        value: CellValues.none,
        state: CellState.open,
      });
    }
  }
  let bombsPlaced = 0;
  while (bombsPlaced < NO_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS);
    const randomCol = Math.floor(Math.random() * MAX_COLUMNS);
    const currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValues.bomb) {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (randomRow === rowIndex && randomCol === colIndex) {
            return { ...cell, value: CellValues.bomb };
          }
          return cell;
        })
      );
      bombsPlaced++;
    }
  }

  //Calculate the number for each cell
  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    cells.push([]);
    for (let colIndex = 0; colIndex < MAX_COLUMNS; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];
      if (currentCell.value === CellValues.bomb) {
        continue;
      }

      let numberOfBombs = 0;

      const {
        topLeftCell,
        topCell,
        topRightCell,
        rightCell,
        bottomRightCell,
        bottomCell,
        bottomLeftCell,
        leftCell,
      } = grabAllAdjacentCells(cells, rowIndex, colIndex);

      if (topLeftCell?.value === CellValues.bomb) numberOfBombs++;
      if (topCell?.value === CellValues.bomb) numberOfBombs++;
      if (topRightCell?.value === CellValues.bomb) numberOfBombs++;
      if (leftCell?.value === CellValues.bomb) numberOfBombs++;
      if (rightCell?.value === CellValues.bomb) numberOfBombs++;
      if (bottomLeftCell?.value === CellValues.bomb) numberOfBombs++;
      if (bottomCell?.value === CellValues.bomb) numberOfBombs++;
      if (bottomRightCell?.value === CellValues.bomb) numberOfBombs++;
      if (numberOfBombs > 0) {
        cells[rowIndex][colIndex] = {
          ...currentCell,
          value: numberOfBombs,
        };
      }
    }
  }
  return cells;
};

export const openMultipleCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number
): Cell[][] => {
  let newCells = cells.slice();
  newCells[rowParam][colParam].state = CellState.visible;

  const {
    topLeftCell,
    topCell,
    topRightCell,
    rightCell,
    bottomRightCell,
    bottomCell,
    bottomLeftCell,
    leftCell,
  } = grabAllAdjacentCells(cells, rowParam, colParam);

  if (
    topLeftCell?.state === CellState.open &&
    topLeftCell.value !== CellValues.bomb
  ) {
    if (topLeftCell.value === CellValues.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, colParam - 1);
    } else {
      newCells[rowParam - 1][colParam - 1].state = CellState.visible;
    }
  }
  if (topCell?.state === CellState.open && topCell.value !== CellValues.bomb) {
    if (topCell.value === CellValues.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, colParam);
    } else {
      newCells[rowParam - 1][colParam].state = CellState.visible;
    }
  }
  if (
    topRightCell?.state === CellState.open &&
    topRightCell.value !== CellValues.bomb
  ) {
    if (topRightCell.value === CellValues.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, colParam + 1);
    } else {
      newCells[rowParam - 1][colParam + 1].state = CellState.visible;
    }
  }
  if (
    leftCell?.state === CellState.open &&
    leftCell.value !== CellValues.bomb
  ) {
    if (leftCell.value === CellValues.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam - 1);
    } else {
      newCells[rowParam][colParam - 1].state = CellState.visible;
    }
  }
  if (
    rightCell?.state === CellState.open &&
    rightCell.value !== CellValues.bomb
  ) {
    if (rightCell.value === CellValues.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam + 1);
    } else {
      newCells[rowParam][colParam + 1].state = CellState.visible;
    }
  }
  if (
    bottomLeftCell?.state === CellState.open &&
    bottomLeftCell.value !== CellValues.bomb
  ) {
    if (bottomLeftCell.value === CellValues.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, colParam - 1);
    } else {
      newCells[rowParam + 1][colParam - 1].state = CellState.visible;
    }
  }
  if (
    bottomCell?.state === CellState.open &&
    bottomCell.value !== CellValues.bomb
  ) {
    if (bottomCell.value === CellValues.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, colParam);
    } else {
      newCells[rowParam + 1][colParam].state = CellState.visible;
    }
  }
  if (
    bottomRightCell?.state === CellState.open &&
    bottomRightCell.value !== CellValues.bomb
  ) {
    if (bottomRightCell.value === CellValues.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, colParam + 1);
    } else {
      newCells[rowParam + 1][colParam + 1].state = CellState.visible;
    }
  }

  return newCells;
};
