import { Sudoku } from "../interfaces/sudoku.interface";
import { formatToArray } from "../utils/sudoku.utils";

const DEFAULT_PUZZLE_STRING =
  "837629145.4.318..2921574368.54186239163...8.7289.53416..28.56.1...241..3318967524";

// Default sudoku in case there is an error when fetching data
export const DEFAULT_SUDOKU: Sudoku = {
  id: "1",
  puzzle: formatToArray(DEFAULT_PUZZLE_STRING),
};
