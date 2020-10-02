export enum CellValues {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}

export enum CellState {
  open,
  visible,
  flagged,
}

export type Cell = { value: CellValues; state: CellState };

export enum Faces {
  smile = "😁",
  oh = "😰",
  lost = "😵",
  win = "🥳",
}

export type AdjacentCells = {
  topLeftCell: Cell | null;
  topCell: Cell | null;
  topRightCell: Cell | null;
  rightCell: Cell | null;
  bottomRightCell: Cell | null;
  bottomCell: Cell | null;
  bottomLeftCell: Cell | null;
  leftCell: Cell | null;
};
