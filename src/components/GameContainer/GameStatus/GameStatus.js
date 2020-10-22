import React from "react";
import cx from "classnames";
import styles from "./GameStatus.module.css";

import { props, constants } from "../../../utils";

const { GAME_STATUS } = constants;

function GameStatus({ gameStatus }) {
  return (
    <div
      className={cx(
        styles.message,
        gameStatus === GAME_STATUS.win && styles.win
      )}>
      {gameStatus === GAME_STATUS.gameOver ? (
        <>
          <h1>Game Over</h1>
          <h3>Press Start!!</h3>
        </>
      ) : (
        <h1>You Win!</h1>
      )}
    </div>
  );
}

GameStatus.propType = {
  gameStatus: props.gameStatus,
};

export default GameStatus;
