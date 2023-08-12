import { SudokuCell } from "./sudoku.interface";

export interface GetSudokuResponse {
  data: GetSudokuResponseEntry[];
}

export interface GetSudokuResponseEntry {
  id: string;
  puzzleString: string;
}
