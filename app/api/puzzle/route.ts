import supabase from "@/app/db/supabase";
import { GetSudokuResponse } from "@/app/interfaces/api-response.interface";

import { NextResponse } from "next/server";

// Follow up in the future: Make this type better
// return a random response
export async function GET(): Promise<NextResponse<GetSudokuResponse>> {
  try {
    const { data, error } = await supabase.from("sudoku_puzzles").select();
    if (data === null || data === undefined) {
      throw new Error("No data");
    }
    if (error) {
      throw new Error(error);
    }
    const puzzles = data.map((row) => {
      return {
        id: row.id,
        puzzleString: row.puzzle as string,
      };
    });
    return NextResponse.json({ data: puzzles });
  } catch (err) {
    console.log("error", err);
    throw new Error("error");
  }
}
