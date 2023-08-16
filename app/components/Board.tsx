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
    <div
      className="flex flex-col justify-center items-center border border-slate-500 m-auto"
      role="grid"
    >
      {currentSudoku.puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="flex" role="row">
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
