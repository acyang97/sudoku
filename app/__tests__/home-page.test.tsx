import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../page";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { TestProvider } from "../utils/Test.utils";

const PUZZLE_1 = {
  id: "7379c39c-c7e9-436f-bfa5-4079824c5cb1",
  puzzleString:
    "52...6.........7.13...........4..8..6......5...........418.........3..2...87.....",
};
const PUZZLE_2 = {
  id: "29878923-cbdb-40fb-af86-443607be08a9",
  puzzleString:
    "837629145.4.318..2921574368.54186239163...8.7289.53416..28.56.1...241..3318967524",
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Home", () => {
  describe("Render sudoku board and", () => {
    it("displays a random board after fetching data ", async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: { data: [PUZZLE_1, PUZZLE_2] },
      });
      await act(async () =>
        render(
          <TestProvider>
            <Home />
          </TestProvider>
        )
      );
      const board = screen.getByRole("grid");
      expect(board).not.toBeEmptyDOMElement();

      const cells = screen.getAllByRole("gridcell");
      expect(cells.length).toBe(9 * 9);
    });

    it("displays a random board with the right details", async () => {
      // Don't want a random board for this test so that we can do assertions later on
      mockedAxios.get.mockResolvedValueOnce({
        data: { data: [PUZZLE_1] },
      });
      await act(async () =>
        render(
          <TestProvider>
            <Home />
          </TestProvider>
        )
      );
      const board = screen.getByRole("grid");
      expect(board).not.toBeEmptyDOMElement();

      const emptyCells = screen.getAllByRole("spinbutton", {
        value: {
          now: 0,
        },
      });
      expect(emptyCells.length).toBe(
        PUZZLE_1.puzzleString.split("").filter((val) => val === ".").length
      );
    });
  });
});
