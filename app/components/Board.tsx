"use client";

import React from "react";
import Cell from "./Cell";
import { Sudoku } from "../interfaces/sudoku.interface";

interface Props {
  currentSudoku: Sudoku;
  setCurrentSudoku: React.Dispatch<React.SetStateAction<Sudoku>>;
  setGameSolved: React.Dispatch<React.SetStateAction<boolean>>;
}

const Board: React.FC<Props> = ({
  currentSudoku,
  setCurrentSudoku,
  setGameSolved,
}) => {
  return (
    <div className="flex justify-center flex-col border border-slate-500">
      {currentSudoku.puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((item, colIndex) => (
            <Cell
              sudokuCell={item}
              key={colIndex}
              currentSudoku={currentSudoku}
              setCurrentSudoku={setCurrentSudoku}
              setGameSolved={setGameSolved}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
