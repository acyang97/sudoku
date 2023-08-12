import { Sudoku, SudokuCell } from "../interfaces/sudoku.interface";

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
      return false;
    }
  }

  // check col
  for (let row = 0; row < 9; row++) {
    if (row === currentRow) {
      continue;
    }
    if (sudoku.puzzle[row][currentCol].value === value) {
      return false;
    }
  }

  // check 3x3 mini grid
  let startRow = currentRow - (currentRow % 3);
  let startCol = currentCol - (currentCol % 3);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (sudoku.puzzle[row + startRow][col + startCol].value === value) {
        return false;
      }
    }
  }

  return true;
};

export const getValidity = (sudoku: Sudoku) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const val = sudoku.puzzle[row][col].value;
      console.log(
        `row: ${row}, col: ${col}`,
        checkIfInputIsValid(sudoku, row, col, val)
      );
    }
  }
};

// Sudoku solver copied from https://www.geeksforgeeks.org/sudoku-backtracking-7/
let N = 9;

/**
 * Handle case where puzzle cant solve
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
    if (isSafe(grid, row, col, num)) {
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

function isSafe(grid: Sudoku, row: number, col: number, num: number) {
  // Check if we find the same num
  // in the similar row , we
  // return false
  for (let x = 0; x <= 8; x++)
    if (grid.puzzle[row][x].value === num) {
      return false;
    }
  // Check if we find the same num
  // in the similar column ,
  // we return false
  for (let x = 0; x <= 8; x++)
    if (grid.puzzle[x][col].value === num) {
      return false;
    }
  // Check if we find the same num
  // in the particular 3*3
  // matrix, we return false
  let startRow = row - (row % 3),
    startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid.puzzle[i + startRow][j + startCol].value === num) {
        return false;
      }
    }
  }

  return true;
}
