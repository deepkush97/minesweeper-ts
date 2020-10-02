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
