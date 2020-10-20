import React, { useRef } from "react";
import { gsap } from "gsap";
import styles from "./GameContainer.module.css";
import Cup from "./Cup";
import GameActions from "./GameActions/GameActions";
import Ball from "./Ball";

const tl = gsap.timeline({ paused: true });

const cups = [1, 2, 3];

function GameContainer() {
  const ball = useRef(null);
  const cupsRefs = useRef([]);

  const handleStart = (e) => {
    e.preventDefault();
    tl.fromTo(ball.current, { x: -999 }, { duration: 1, x: 0 });
    tl.play();
    console.log(cupsRefs);
  };

  return (
    <>
      <GameActions onStart={handleStart} />
      <div className={styles.game_container}>
        {cups.map((el) => (
          <Cup key={el} ref={(ref) => cupsRefs.current.push(ref)} />
        ))}
        <Ball ref={ball} />
      </div>
    </>
  );
}

export default GameContainer;
