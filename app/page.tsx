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

const Home = () => {
  const [resetCount, setResetCount] = useState(0);
  const [getAnswerClickCount, setGetAnswerClickCount] = useState(0);
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

  const onGetAnswerClick = () => {
    if (gameSolved) {
      return;
    }
    setGetAnswerClickCount((prev) => prev + 1);
    const initialPuzzle = sudokus.find((sud) => sud.id === currentSudoku.id)!;
    const answer = solvePuzzle({
      id: initialPuzzle.id,
      puzzle: formatToArray(initialPuzzle.puzzleString),
    });
    setCurrentSudoku(answer);
    setGameSolved(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-14 gap-4">
      {isLoading ? (
        <h2>Loading</h2>
      ) : (
        <>
          <h2
            className={["text-4xl", !gameSolved && "invisible"]
              .filter(Boolean)
              .join(" ")}
            aria-live="polite"
            aria-label="Game solved"
          >
            Game Solved!
          </h2>
          <Board
            // Key to regenerate board automatically when necessary instead of using useEffect
            key={`${currentSudoku.id}-${resetCount}-${getAnswerClickCount}`}
            currentSudoku={currentSudoku}
            setCurrentSudoku={setCurrentSudoku}
            setGameSolved={setGameSolved}
          />
          <div className="flex gap-4 justify-center">
            <CustomButton
              onClick={onGetAnswerClick}
              text="Get Answer"
              customStyles="bg-blue-500 hover:bg-blue-700"
              ariaLabel="Get answer"
            />
            <CustomButton
              onClick={onResetClick}
              text="Reset"
              customStyles="bg-purple-500 hover:bg-purple-700"
              ariaLabel="Reset current sudoku"
            />
            <CustomButton
              onClick={onGetRandomClick}
              text="Get Random Sudoku"
              customStyles="bg-emerald-500 hover:bg-emerald-700"
              ariaLabel="Get random sudoku"
            />
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
