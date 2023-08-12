"use client";

import React, { useState } from "react";
import Board from "./components/Board";
import { Sudoku } from "./interfaces/sudoku.interface";
import useGetSudokuResponseQuery from "./hooks/useGetSudokuResponseQuery";
import {
  formatToArray,
  getRandomSudoku,
  solvePuzzle,
} from "./utils/sudoku.utils";
import CustomButton from "./components/CustomButton";

export default function Home() {
  const [resetCount, setResetCount] = useState(0);
  const [solveClickCount, setSolveClickCount] = useState(0);
  const [gameSolved, setGameSolved] = useState(false);
  // The randomly selected sudoku that is currently played
  const [currentSudoku, setCurrentSudoku] = useState<Sudoku>({
    id: "",
    puzzle: Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => {
        return { starting: false, value: null, row: -1, col: -1 };
      })
    ),
  });

  const { isLoading, data: sudokus = [] } =
    useGetSudokuResponseQuery(setCurrentSudoku);

  const onResetClick = () => {
    const original = sudokus.find((puz) => puz.id === currentSudoku.id)!; // definitely exist
    setResetCount((prev) => prev + 1);
    setCurrentSudoku({
      id: original.id,
      puzzle: formatToArray(original.puzzleString),
    });
    setGameSolved(false);
  };

  const onGetRandomClick = () => {
    const newSudoku = getRandomSudoku(sudokus, currentSudoku.id);
    setResetCount((prev) => prev + 1);
    setCurrentSudoku({
      id: newSudoku.id,
      puzzle: formatToArray(newSudoku.puzzleString),
    });
    setGameSolved(false);
  };

  const onSolveClick = () => {
    if (gameSolved) {
      return;
    }
    setSolveClickCount((prev) => prev + 1);
    const initialPuzzle = sudokus.find((sud) => sud.id === currentSudoku.id)!;
    const answer = solvePuzzle({
      id: initialPuzzle.id,
      puzzle: formatToArray(initialPuzzle.puzzleString),
    });
    setCurrentSudoku(answer);
    setGameSolved(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-14 gap-4">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          {gameSolved && <h3>Game Solved</h3>}
          <Board
            // Key to regenerate board automatically when necessary instead of using useEffect
            key={`${currentSudoku.id}-${resetCount}-${solveClickCount}`}
            currentSudoku={currentSudoku}
            setCurrentSudoku={setCurrentSudoku}
            setGameSolved={setGameSolved}
          />
          <div className="flex gap-4 justify-center">
            <CustomButton
              onClick={onSolveClick}
              text="Solve"
              customStyles="bg-blue-500 hover:bg-blue-700"
            />
            <CustomButton
              onClick={onResetClick}
              text="Reset"
              customStyles="bg-purple-500 hover:bg-purple-700"
            />
            <CustomButton
              onClick={onGetRandomClick}
              text="Get Random Puzzle"
              customStyles="bg-emerald-500 hover:bg-emerald-700"
            />
          </div>
        </>
      )}
    </main>
  );
}
