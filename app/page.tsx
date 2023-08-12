"use client";

import React, { useState } from "react";
import Board from "./components/Board";
import { Sudoku } from "./interfaces/sudoku.interface";
import useGetSudokuResponse from "./hooks/useGetSudokuResponse";

export default function Home() {
  // States required for button implementations later
  const [resetCount, setResetCount] = useState(0);
  const [solveClickCount, setSolveClickCount] = useState(0);
  const [gameSolved, setGameSolved] = useState(false);
  // The current randomly selected sudoku that is currently played
  const [currentSudoku, setCurrentSudoku] = useState<Sudoku>({
    id: "",
    puzzle: Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => {
        return { starting: false, value: null, row: -1, col: -1 };
      })
    ),
  });

  const { isLoading } = useGetSudokuResponse(setCurrentSudoku);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
          />
        </>
      )}
    </main>
  );
}
