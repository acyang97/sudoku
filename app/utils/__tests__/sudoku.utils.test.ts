import { Sudoku, SudokuCell } from "@/app/interfaces/sudoku.interface";
import {
  checkIfInputIsValid,
  formatToArray,
  validateSudoku,
} from "../sudoku.utils";

const PUZZLE_1 = {
  id: "7379c39c-c7e9-436f-bfa5-4079824c5cb1",
  puzzleString:
    "52...6.........7.13...........4..8..6......5...........418.........3..2...87.....",
};

describe("sudoku utils", () => {
  describe("formatToArray", () => {
    it("should format the puzzleString to the correct 2d sudoku array", () => {
      const expectedOutput: SudokuCell[][] = [
        [
          { starting: true, value: 5, row: 0, col: 0 },
          { starting: true, value: 2, row: 0, col: 1 },
          { starting: false, value: null, row: 0, col: 2 },
          { starting: false, value: null, row: 0, col: 3 },
          { starting: false, value: null, row: 0, col: 4 },
          { starting: true, value: 6, row: 0, col: 5 },
          { starting: false, value: null, row: 0, col: 6 },
          { starting: false, value: null, row: 0, col: 7 },
          { starting: false, value: null, row: 0, col: 8 },
        ],
        [
          { starting: false, value: null, row: 1, col: 0 },
          { starting: false, value: null, row: 1, col: 1 },
          { starting: false, value: null, row: 1, col: 2 },
          { starting: false, value: null, row: 1, col: 3 },
          { starting: false, value: null, row: 1, col: 4 },
          { starting: false, value: null, row: 1, col: 5 },
          { starting: true, value: 7, row: 1, col: 6 },
          { starting: false, value: null, row: 1, col: 7 },
          { starting: true, value: 1, row: 1, col: 8 },
        ],
        [
          { starting: true, value: 3, row: 2, col: 0 },
          { starting: false, value: null, row: 2, col: 1 },
          { starting: false, value: null, row: 2, col: 2 },
          { starting: false, value: null, row: 2, col: 3 },
          { starting: false, value: null, row: 2, col: 4 },
          { starting: false, value: null, row: 2, col: 5 },
          { starting: false, value: null, row: 2, col: 6 },
          { starting: false, value: null, row: 2, col: 7 },
          { starting: false, value: null, row: 2, col: 8 },
        ],
        [
          { starting: false, value: null, row: 3, col: 0 },
          { starting: false, value: null, row: 3, col: 1 },
          { starting: false, value: null, row: 3, col: 2 },
          { starting: true, value: 4, row: 3, col: 3 },
          { starting: false, value: null, row: 3, col: 4 },
          { starting: false, value: null, row: 3, col: 5 },
          { starting: true, value: 8, row: 3, col: 6 },
          { starting: false, value: null, row: 3, col: 7 },
          { starting: false, value: null, row: 3, col: 8 },
        ],
        [
          { starting: true, value: 6, row: 4, col: 0 },
          { starting: false, value: null, row: 4, col: 1 },
          { starting: false, value: null, row: 4, col: 2 },
          { starting: false, value: null, row: 4, col: 3 },
          { starting: false, value: null, row: 4, col: 4 },
          { starting: false, value: null, row: 4, col: 5 },
          { starting: false, value: null, row: 4, col: 6 },
          { starting: true, value: 5, row: 4, col: 7 },
          { starting: false, value: null, row: 4, col: 8 },
        ],
        [
          { starting: false, value: null, row: 5, col: 0 },
          { starting: false, value: null, row: 5, col: 1 },
          { starting: false, value: null, row: 5, col: 2 },
          { starting: false, value: null, row: 5, col: 3 },
          { starting: false, value: null, row: 5, col: 4 },
          { starting: false, value: null, row: 5, col: 5 },
          { starting: false, value: null, row: 5, col: 6 },
          { starting: false, value: null, row: 5, col: 7 },
          { starting: false, value: null, row: 5, col: 8 },
        ],
        [
          { starting: false, value: null, row: 6, col: 0 },
          { starting: true, value: 4, row: 6, col: 1 },
          { starting: true, value: 1, row: 6, col: 2 },
          { starting: true, value: 8, row: 6, col: 3 },
          { starting: false, value: null, row: 6, col: 4 },
          { starting: false, value: null, row: 6, col: 5 },
          { starting: false, value: null, row: 6, col: 6 },
          { starting: false, value: null, row: 6, col: 7 },
          { starting: false, value: null, row: 6, col: 8 },
        ],
        [
          { starting: false, value: null, row: 7, col: 0 },
          { starting: false, value: null, row: 7, col: 1 },
          { starting: false, value: null, row: 7, col: 2 },
          { starting: false, value: null, row: 7, col: 3 },
          { starting: true, value: 3, row: 7, col: 4 },
          { starting: false, value: null, row: 7, col: 5 },
          { starting: false, value: null, row: 7, col: 6 },
          { starting: true, value: 2, row: 7, col: 7 },
          { starting: false, value: null, row: 7, col: 8 },
        ],
        [
          { starting: false, value: null, row: 8, col: 0 },
          { starting: false, value: null, row: 8, col: 1 },
          { starting: true, value: 8, row: 8, col: 2 },
          { starting: true, value: 7, row: 8, col: 3 },
          { starting: false, value: null, row: 8, col: 4 },
          { starting: false, value: null, row: 8, col: 5 },
          { starting: false, value: null, row: 8, col: 6 },
          { starting: false, value: null, row: 8, col: 7 },
          { starting: false, value: null, row: 8, col: 8 },
        ],
      ];
      expect(formatToArray(PUZZLE_1.puzzleString)).toEqual(expectedOutput);
    });
  });
  describe("checkIfInputIsValid", () => {
    const SUDOKU_1: Sudoku = {
      ...PUZZLE_1,
      puzzle: formatToArray(PUZZLE_1.puzzleString),
    };
    const ROW = 0;
    const COL = 3;
    it("should return true when input is valid", () => {
      const NEW_VALUE = 9;
      expect(checkIfInputIsValid(SUDOKU_1, ROW, COL, NEW_VALUE)).toBe(true);
    });

    it("should return true when input is empty", () => {
      const NEW_VALUE = null;
      expect(checkIfInputIsValid(SUDOKU_1, ROW, COL, NEW_VALUE)).toBe(true);
    });

    it("should return false when input is invalid due to same number in the same column", () => {
      const NEW_VALUE = 4;
      expect(checkIfInputIsValid(SUDOKU_1, ROW, COL, NEW_VALUE)).toBe(false);
    });

    it("should return false when input is invalid due to same number in the same row", () => {
      const NEW_VALUE = 5;
      expect(checkIfInputIsValid(SUDOKU_1, ROW, COL, NEW_VALUE)).toBe(false);
    });

    it("should return false when input is invalid due to same number in the same mini box", () => {
      const INVALID_ROW = 1;
      const INVALID_COL = 1;
      const NEW_VALUE = 5;
      expect(
        checkIfInputIsValid(SUDOKU_1, INVALID_ROW, INVALID_COL, NEW_VALUE)
      ).toBe(false);
    });
  });
  describe("validateSudoku", () => {
    it("should return true when the puzzle is completed correctly", () => {
      const CORRECT_PUZZLE: SudokuCell[][] = [
        [6, 3, 4, 7, 2, 8, 9, 1, 5],
        [1, 7, 9, 4, 5, 6, 2, 8, 3],
        [5, 2, 8, 9, 1, 3, 4, 6, 7],
        [4, 5, 6, 3, 9, 7, 1, 2, 8],
        [2, 1, 3, 8, 6, 5, 7, 4, 9],
        [8, 9, 7, 1, 4, 2, 5, 3, 6],
        [7, 6, 2, 5, 8, 4, 3, 9, 1],
        [3, 8, 1, 2, 7, 9, 6, 5, 4],
        [9, 4, 5, 6, 3, 1, 8, 7, 2],
      ].map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          return {
            row: rowIndex,
            col: colIndex,
            value: cell,
            starting: false,
          };
        })
      );
      const CORRECT_SUDOKU: Sudoku = {
        id: "1",
        puzzle: CORRECT_PUZZLE,
      };
      expect(validateSudoku(CORRECT_SUDOKU)).toBe(true);
    });

    it("should return false when the puzzle is completed incorrectly", () => {
      const CORRECT_PUZZLE: SudokuCell[][] = [
        [6, 3, 4, 7, 2, 8, 9, 1, 5],
        [2, 7, 9, 4, 5, 6, 2, 8, 3],
        [5, 2, 8, 9, 1, 3, 4, 6, 7],
        [4, 5, 6, 3, 9, 7, 1, 2, 8],
        [2, 1, 3, 8, 6, 5, 7, 4, 9],
        [8, 9, 7, 1, 4, 2, 5, 3, 6],
        [7, 6, 2, 5, 8, 4, 3, 9, 1],
        [3, 8, 1, 2, 7, 9, 6, 5, 4],
        [9, 4, 5, 6, 3, 1, 8, 7, 2],
      ].map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          return {
            row: rowIndex,
            col: colIndex,
            value: cell,
            starting: false,
          };
        })
      );
      const INCORRECT_SUDOKU: Sudoku = {
        id: "1",
        puzzle: CORRECT_PUZZLE,
      };
      expect(validateSudoku(INCORRECT_SUDOKU)).toBe(false);
    });

    it("should return false when the puzzle is not completed yet", () => {
      const INCOMPLETE_SUDOKU: Sudoku = {
        ...PUZZLE_1,
        puzzle: formatToArray(PUZZLE_1.puzzleString),
      };
      expect(validateSudoku(INCOMPLETE_SUDOKU)).toBe(false);
    });
  });
});
