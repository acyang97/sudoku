import { GetSudokuResponseEntry } from "../interfaces/api-response.interface";
import { Sudoku, SudokuCell } from "../interfaces/sudoku.interface";

/**
 *
 * @param sudokus list of sudokus
 * @param currentSudokuId an existing sudoku id if we want a sudoku that is different from the current one
 * @returns a random sudoku with id and puzzleString property
 */
export const getRandomSudoku = (
  sudokus: GetSudokuResponseEntry[],
  currentSudokuId?: string
): GetSudokuResponseEntry => {
  if (currentSudokuId) {
    let newSudokuId = currentSudokuId;
    while (newSudokuId === currentSudokuId) {
      newSudokuId = [...sudokus][Math.floor(sudokus.length * Math.random())].id;
    }
    return [...sudokus].find((sud) => sud.id === newSudokuId)!;
  } else {
    return [...sudokus][Math.floor(sudokus.length * Math.random())];
  }
};

/**
 * @param puzzleString puzzle string from the db
 * @returns 9 x 9 PuzzleCell that contains more information regarding the cell's row, col, initial value and whether it is a starting cell
 */
export const formatToArray = (puzzleString: string): SudokuCell[][] => {
  let result = [];
  for (let i = 0; i < puzzleString.length; i += 9) {
    const currentRow = puzzleString.slice(i, i + 9);
    result.push(
      currentRow.split("").map((val) => {
        if (val === ".") {
          return {
            starting: false,
            value: null,
          };
        }
        return {
          starting: true,
          value: parseInt(val),
        };
      })
    );
  }
  result = result.map((row, rowIndex) =>
    row.map((item, colIndex) => {
      return {
        ...item,
        row: rowIndex,
        col: colIndex,
      };
    })
  );
  return result;
};

/**
 * To check if the current value is valid
 * @param sudoku sudoku to check against
 * @param currentRow row of value to be checked
 * @param currentCol col of value to be checked
 * @param value new value inserted to the cell
 * @returns true if the new value is a valid input
 */
export const checkIfInputIsValid = (
  sudoku: Sudoku,
  currentRow: number,
  currentCol: number,
  value: number | null
): boolean => {
  // don't need to check
  if (value === null) {
    return true;
  }
  // check row
  for (let col = 0; col < 9; col++) {
    if (col === currentCol) {
      continue;
    }
    if (sudoku.puzzle[currentRow][col].value === value) {
      console.log("wrong when checking row");
      return false;
    }
  }

  // check col
  for (let row = 0; row < 9; row++) {
    if (row === currentRow) {
      continue;
    }
    if (sudoku.puzzle[row][currentCol].value === value) {
      console.log("wrong when checking col");
      return false;
    }
  }

  // check 3x3 mini grid
  let startRow = currentRow - (currentRow % 3);
  let startCol = currentCol - (currentCol % 3);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const r = row + startRow;
      const c = col + startCol;
      if (r === currentRow && c === currentCol) {
        continue;
      }
      if (sudoku.puzzle[r][c].value === value) {
        console.log("wrong when checking mini box");
        return false;
      }
    }
  }

  return true;
};

export const validateSudoku = (sudoku: Sudoku) => {
  if (sudoku.puzzle.some((row) => row.some((cell) => cell.value === null))) {
    return false;
  }
  for (let i = 0; i < 9; i++) {
    let row = new Set(),
      col = new Set(),
      box = new Set();

    for (let j = 0; j < 9; j++) {
      let _row = sudoku.puzzle[i][j].value;
      let _col = sudoku.puzzle[j][i].value;
      let _box =
        sudoku.puzzle[3 * Math.floor(i / 3) + Math.floor(j / 3)][
          3 * (i % 3) + (j % 3)
        ].value;

      if (_row !== null) {
        if (row.has(_row)) return false;
        row.add(_row);
      }
      if (_col !== null) {
        if (col.has(_col)) return false;
        col.add(_col);
      }

      if (_box !== null) {
        if (box.has(_box)) return false;
        box.add(_box);
      }
    }
  }
  return true;
};

// Sudoku solver copied from https://www.geeksforgeeks.org/sudoku-backtracking-7/
let N = 9;

/**
 * Get answer of current sudoku to display it to user if he clicks "solve"
 * @param sudoku sudoku to solve
 * @returns a solved sudoku
 */
export function solvePuzzle(sudoku: Sudoku) {
  solveSudoku(sudoku, 0, 0);
  return sudoku;
}

function solveSudoku(grid: Sudoku, row: number, col: number) {
  /* If we have reached the 8th
       row and 9th column (0
       indexed matrix) ,
       we are returning true to avoid further
       backtracking       */
  if (row === N - 1 && col === N) {
    return true;
  }
  // Check if column value  becomes 9 ,
  // we move to next row
  // and column start from 0
  if (col === N) {
    row++;
    col = 0;
  }

  // Check if the current position
  // of the grid already
  // contains value >0, we iterate
  // for next column
  if (grid.puzzle[row][col].value !== null) {
    return solveSudoku(grid, row, col + 1);
  }

  for (let num = 1; num < 10; num++) {
    // Check if it is safe to place
    // the num (1-9)  in the given
    // row ,col ->we move to next column
    if (checkIfInputIsValid(grid, row, col, num)) {
      /*  assigning the num in the current
            (row,col)  position of the grid and
            assuming our assigned num in the position
            is correct */
      grid.puzzle[row][col].value = num;

      // Checking for next
      // possibility with next column
      if (solveSudoku(grid, row, col + 1)) return true;
    }

    /* removing the assigned num , since our
           assumption was wrong , and we go for next
           assumption with diff num value   */
    grid.puzzle[row][col].value = null;
  }
  return false;
}
