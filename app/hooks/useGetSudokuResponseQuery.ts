import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetSudokuResponse } from "../interfaces/api-response.interface";
import { Sudoku } from "../interfaces/sudoku.interface";
import { formatToArray, getRandomSudoku } from "../utils/sudoku.utils";

/**
 * Custom hook to fetch all the sudoku puzzles from the db
 * @param setCurrentSudoku setState action to set a random sudoku on initial fetch of data
 * @returns returns a react-query UseQueryResult
 */
const useGetSudokuResponseQuery = (
  setCurrentSudoku: React.Dispatch<React.SetStateAction<Sudoku>>
) => {
  return useQuery({
    queryKey: ["puzzles"],
    queryFn: async () => {
      const res = await axios.get<GetSudokuResponse>("/api/puzzle");
      const sudokuResponse: GetSudokuResponse = res.data;
      const rand = getRandomSudoku(sudokuResponse.data);
      setCurrentSudoku((_) => {
        return {
          id: rand.id,
          puzzle: formatToArray(rand.puzzleString),
        };
      });
      return sudokuResponse.data;
    },
  });
};

export default useGetSudokuResponseQuery;
