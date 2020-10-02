import React from "react";
import { CellState, CellValues } from "../../types";
import "./Button.scss";
interface ButtonProps {
  row: number;
  col: number;
  value: CellValues;
  state: CellState;
}

const Button: React.FC<ButtonProps> = ({ row, col, value, state }) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValues.bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      } else if (value === CellValues.none) return null;
      return value;
    } else if (state === CellState.flagged) {
      return (
        <span role="img" aria-label="flag">
          ⛳
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`Button ${
        state === CellState.visible ? "visible" : ""
      } value-${value}`}
    >
      {renderContent()}
    </div>
  );
};

export default Button;
