import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetSudokuResponse } from "../interfaces/api-response.interface";
import { formatToArray } from "../utils/sudoku.utils";
import { Sudoku } from "../interfaces/sudoku.interface";

const useGetSudokuResponse = (
  setCurrentSudoku: React.Dispatch<React.SetStateAction<Sudoku>>
) => {
  return useQuery({
    queryKey: ["puzzles"],
    queryFn: async () => {
      const res = await axios.get<GetSudokuResponse>("/api/puzzle");
      const sudokus: Sudoku[] = res.data.data.map((sudoku) => {
        return {
          id: sudoku.id,
          puzzle: formatToArray(sudoku.puzzleString),
        };
      });
      setCurrentSudoku(sudokus[Math.floor(sudokus.length * Math.random())]);
      // Return the data so that we can allow user to generate a random sudoku if he wants to
      return sudokus;
    },
  });
};

export default useGetSudokuResponse;
