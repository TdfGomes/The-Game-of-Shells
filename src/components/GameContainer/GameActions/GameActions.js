import React from "react";
import styles from "./GameActions.module.css";

function GameActions({ onStart }) {
  return (
    <div className={styles.game_actions}>
      <button onClick={onStart}>Start</button>
    </div>
  );
}

export default GameActions;
