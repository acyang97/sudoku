import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Cell from "../Cell";
import { formatToArray } from "@/app/utils/sudoku.utils";
import { Sudoku, SudokuCell } from "@/app/interfaces/sudoku.interface";

const PUZZLE_1 = {
  id: "7379c39c-c7e9-436f-bfa5-4079824c5cb1",
  puzzleString:
    "52...6.........7.13...........4..8..6......5...........418.........3..2...87.....",
};

const mockedSetCurrentSudoku = jest.fn();
const mockedSetGameSolved = jest.fn();

describe("Cell", () => {
  it("renders cell accordingly when the cell is not a starting value from the sudoku", () => {
    const sudokuCell: SudokuCell = {
      starting: false,
      value: null,
      row: 0,
      col: 2,
    };
    const currentSudoku: Sudoku = {
      ...PUZZLE_1,
      puzzle: formatToArray(PUZZLE_1.puzzleString),
    };
    const screen = render(
      <Cell
        sudokuCell={sudokuCell}
        currentSudoku={currentSudoku}
        setGameSolved={mockedSetGameSolved}
        setCurrentSudoku={mockedSetCurrentSudoku}
      />
    );
    const spinButton = screen.getByRole("spinbutton");
    expect(spinButton).toHaveDisplayValue("");
    expect(spinButton).not.toBeDisabled();
  });

  it("renders cell accordingly when the cell is a starting value from the sudoku", () => {
    const sudokuCell = {
      starting: true,
      value: 5,
      row: 0,
      col: 0,
    };
    const currentSudoku = {
      ...PUZZLE_1,
      puzzle: formatToArray(PUZZLE_1.puzzleString),
    };
    const screen = render(
      <Cell
        sudokuCell={sudokuCell}
        currentSudoku={currentSudoku}
        setGameSolved={mockedSetGameSolved}
        setCurrentSudoku={mockedSetCurrentSudoku}
      />
    );
    const spinButton = screen.getByRole("spinbutton");
    expect(spinButton).toHaveDisplayValue("5");
    expect(spinButton).toBeDisabled();
  });

  it("triggers the setState functions accordingly when the input is changed", async () => {
    const sudokuCell: SudokuCell = {
      starting: false,
      value: null,
      row: 0,
      col: 2,
    };
    const currentSudoku: Sudoku = {
      ...PUZZLE_1,
      puzzle: formatToArray(PUZZLE_1.puzzleString),
    };
    const screen = render(
      <Cell
        sudokuCell={sudokuCell}
        currentSudoku={currentSudoku}
        setGameSolved={mockedSetGameSolved}
        setCurrentSudoku={mockedSetCurrentSudoku}
      />
    );
    const spinButton = screen.getByRole("spinbutton");
    expect(spinButton).toHaveDisplayValue("");
    expect(spinButton).not.toBeDisabled();
    await waitFor(() => userEvent.type(spinButton, "5"));
    expect(mockedSetCurrentSudoku).toBeCalledTimes(1);
    expect(mockedSetGameSolved).toBeCalledTimes(1);
  });
});
