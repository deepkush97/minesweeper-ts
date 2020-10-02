import { MAX_COLUMNS, MAX_ROWS, NO_OF_BOMBS } from "../constants";
import { CellValues, CellState, Cell } from "../types";

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
      const topLeftBomb =
        rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null;
      const topBomb = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
      const topRightBomb =
        rowIndex > 0 && colIndex < MAX_COLUMNS - 1
          ? cells[rowIndex - 1][colIndex + 1]
          : null;
      const leftBomb = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;
      const rightBomb =
        colIndex < MAX_COLUMNS - 1 ? cells[rowIndex][colIndex + 1] : null;
      const bottomLeftBomb =
        rowIndex < MAX_ROWS - 1 && colIndex > 0
          ? cells[rowIndex + 1][colIndex - 1]
          : null;
      const bottomBomb =
        rowIndex < MAX_ROWS - 1 ? cells[rowIndex + 1][colIndex] : null;
      const bottomRightBomb =
        rowIndex < MAX_ROWS - 1 && colIndex < MAX_COLUMNS - 1
          ? cells[rowIndex + 1][colIndex + 1]
          : null;

      if (topLeftBomb?.value === CellValues.bomb) numberOfBombs++;
      if (topBomb?.value === CellValues.bomb) numberOfBombs++;
      if (topRightBomb?.value === CellValues.bomb) numberOfBombs++;
      if (leftBomb?.value === CellValues.bomb) numberOfBombs++;
      if (rightBomb?.value === CellValues.bomb) numberOfBombs++;
      if (bottomLeftBomb?.value === CellValues.bomb) numberOfBombs++;
      if (bottomBomb?.value === CellValues.bomb) numberOfBombs++;
      if (bottomRightBomb?.value === CellValues.bomb) numberOfBombs++;
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
