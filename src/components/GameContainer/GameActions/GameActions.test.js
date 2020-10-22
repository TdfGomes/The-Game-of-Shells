import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameActions from "./GameActions";

const onClick = jest.fn();

test("Should have a button to start the game", async () => {
  render(<GameActions onStart={onClick} />);
  await userEvent.click(screen.getByText(/start/gi));

  expect(onClick).toHaveBeenCalled();
  expect(screen.getByText(/start/gi)).toHaveTextContent("Start");
  expect(screen.getByText(/start/gi).tagName).toEqual("BUTTON");
});
