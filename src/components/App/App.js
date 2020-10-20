import React from "react";
import GameContiner from "../GameContainer";

import styles from "./App.module.css";

function App() {
  return (
    <>
      <GameContiner />
      <div className={styles.container}>
        <div className={styles.table} />
        <div className={styles.background} />
      </div>
    </>
  );
}

export default App;
