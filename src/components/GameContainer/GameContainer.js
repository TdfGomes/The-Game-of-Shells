import React from "react";
import styles from "./GameContainer.module.css";
import Cup from "./Cup";

function GameContainer() {
  return (
    <div className={styles.game_container}>
      <Cup />
      <Cup />
      <Cup hasBall />
    </div>
  );
}

export default GameContainer;
