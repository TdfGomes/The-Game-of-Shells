import React from "react";
import { render, screen } from "@testing-library/react";
import GameStatus from "./GameStatus";
import { constants } from "../../../utils";

const { GAME_STATUS } = constants;

test("GameStatus should display the correct message", () => {
  const { rerender } = render(<GameStatus gameStatus={GAME_STATUS.none} />);
  expect(screen.getByText(/win/gi)).toHaveTextContent("You Win!");
  expect(screen.getByText(/win/gi).tagName).toEqual("H1");
  expect(screen.queryByText(/over/gi)).not.toBeInTheDocument();

  rerender(<GameStatus gameStatus={GAME_STATUS.gameOver} />);

  expect(screen.queryByText(/win/gi)).not.toBeInTheDocument();
  expect(screen.getByText(/over/gi)).toHaveTextContent("Game Over");
  expect(screen.getByText(/over/gi).tagName).toEqual("H1");
  expect(screen.getByText(/start/gi)).toHaveTextContent("Press Start!!");
  expect(screen.getByText(/start/gi).tagName).toEqual("H3");
});
