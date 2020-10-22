import React from "react";
import { render, screen } from "@testing-library/react";
import GameContainer from "./GameContainer";

test("should have the essencial elements in the document", async () => {
  const { container } = render(<GameContainer />);
  expect(screen.getByText(/start/gi)).toHaveTextContent("Start");
  expect(screen.getByText(/start/gi).tagName).toEqual("BUTTON");

  expect(screen.getByLabelText(/ball/gi)).toBeInTheDocument();

  const cups = container.querySelectorAll(".cup");

  cups.forEach((cup) => {
    expect(cup).toBeInTheDocument();
  });

  expect(cups).toHaveLength(3);
});
