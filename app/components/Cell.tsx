"use client";

import { ChangeEvent, useState } from "react";
import { Sudoku, SudokuCell } from "../interfaces/sudoku.interface";
import { checkIfInputIsValid, validateSudoku } from "../utils/sudoku.utils";

interface Props {
  sudokuCell: SudokuCell;
  currentSudoku: Sudoku;
  setCurrentSudoku: React.Dispatch<React.SetStateAction<Sudoku>>;
  setGameSolved: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cell: React.FC<Props> = ({
  sudokuCell,
  setCurrentSudoku,
  currentSudoku,
  setGameSolved,
}) => {
  const [isValid, setIsValid] = useState(true);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 2) {
      return;
    }
    const value = e.target.value ? parseInt(e.target.value) : null;
    // don't update if value is out of range
    if (value && (value <= 0 || value > 9)) {
      return;
    }
    let copy = { ...currentSudoku };
    copy.puzzle[sudokuCell.row][sudokuCell.col] = {
      ...copy.puzzle[sudokuCell.row][sudokuCell.col],
      value,
    };
    setIsValid(
      checkIfInputIsValid(copy, sudokuCell.row, sudokuCell.col, value)
    );
    setCurrentSudoku(copy);
    setGameSolved(validateSudoku(copy));
  };

  return (
    <div
      role="gridcell"
      className={[
        "flex",
        "justify-center",
        "items-center",
        "w-14",
        "h-14",
        "text-xl",
        "font-bold",
        "border-2",
        // Differentiate user input with the starting inputs
        sudokuCell.starting && "text-black",
        !sudokuCell.starting && "text-blue-600",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        className={[
          "text-center",
          "bg-transparent",
          "focus:outline-none",
          "focus:border-2",
          "focus:border-t-0",
          "focus:border-l-0",
          "focus:border-r-0",
          // show red underline for invalid inputs even if not on focus
          !isValid && "focus:border-b-red-600 border-b-red-600 border-b-2",
          isValid && "focus:border-b-blue-500",
        ]
          .filter(Boolean)
          .join(" ")}
        disabled={sudokuCell.starting}
        type="number"
        required={false}
        min={1}
        max={9}
        step={1}
        value={sudokuCell.value !== null ? sudokuCell.value : ""}
        aria-valuenow={sudokuCell.value ? sudokuCell.value : 0}
        aria-valuemin={1}
        aria-valuemax={9}
        onChange={(e) => onChangeInput(e)}
        onKeyDown={(e) => {
          if (
            e.code === "Minus" ||
            e.code === "Period" ||
            e.code === "Equal" ||
            e.code === "Plus"
          ) {
            e.preventDefault();
          }
        }}
        aria-label={`row: ${sudokuCell.row + 1}, column: ${
          sudokuCell.col + 1
        }, value: ${sudokuCell.value}`}
        aria-invalid={!isValid}
        role="spinbutton"
      />
    </div>
  );
};

export default Cell;
