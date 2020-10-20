import React from "react";
import styles from "./GameContainer.module.css";
import Cup from "./Cup";
import GameActions from "./GameActions/GameActions";

function GameContainer() {
  const handleStart = (e) => {
    e.preventDefault();
    console.log("START");
  };
  return (
    <>
      <GameActions onStart={handleStart} />
      <div className={styles.game_container}>
        <Cup />
        <Cup />
        <Cup hasBall />
      </div>
    </>
  );
}

export default GameContainer;