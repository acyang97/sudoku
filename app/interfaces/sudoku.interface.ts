export interface Sudoku {
  id: string;
  puzzle: SudokuCell[][];
}

export interface SudokuCell {
  starting: boolean;
  value: number | null;
  row: number;
  col: number;
}
