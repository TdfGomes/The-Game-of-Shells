import React from "react";
import Cup from "./Cup";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { constants } from "../../../utils";

const { GAME_STATUS } = constants;
const onClick = jest.fn();

test("Should only play actions with a started status", async () => {
  const props = {
    hasBall: false,
    onClick,
    gameStatus: GAME_STATUS.none,
  };
  const { rerender } = render(<Cup {...props}>1</Cup>);

  await userEvent.click(screen.getByText("1"));

  expect(onClick).not.toHaveBeenCalled();

  rerender(
    <Cup {...props} gameStatus={GAME_STATUS.started}>
      1
    </Cup>
  );

  await userEvent.click(screen.getByText("1"));
  expect(onClick).toHaveBeenCalled();
});
