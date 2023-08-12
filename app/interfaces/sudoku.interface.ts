export interface Sudoku {
  id: string;
  sudoku: SudokuCell[][];
}

export interface SudokuCell {
  starting: boolean;
  value: number | null;
  row: number;
  col: number;
}
