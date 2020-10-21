import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import Cup from "./Cup";
import GameActions from "./GameActions/GameActions";
import Ball from "./Ball";

import { generateRandomInt } from "../../utils";

import styles from "./GameContainer.module.css";

const tl = gsap.timeline({ paused: true });
const cups = [1, 2, 3];

function GameContainer() {
  const ball = useRef(null);
  const cupsRefs = useRef([]);
  const [cupsXPosition, setCupsXPositions] = useState([]);

  useEffect(() => {
    const postions = [];

    cupsRefs.current.forEach((cup) => {
      const { offsetLeft } = cup;
      postions.push(Math.ceil(offsetLeft - 230)); // Take 200 from the padding and another 30 from the cup. This way we could have the ball centered inside the cup
    });

    setCupsXPositions(postions);
  }, [cupsRefs]);

  const handleStart = (e) => {
    e.preventDefault();

    if (tl.isActive()) return;

    const randInt = generateRandomInt();
    const selectedCup = cupsXPosition[randInt];

    const ballTween = tl.fromTo(
      ball.current,
      { x: 0 },
      { x: selectedCup, ease: "power3.out", duration: 1.5 }
    );
    const cupsTween = tl.fromTo(
      cupsRefs.current,
      { y: 0 },
      { y: 130, ease: "power2.out", duration: 0.8 },
      "-=0.3"
    );

    tl.add(ballTween).add(cupsTween).play();
  };

  return (
    <>
      <GameActions onStart={handleStart} />
      <div id="container" className={styles.game_container}>
        {cups.map((el) => (
          <Cup key={el} ref={(ref) => cupsRefs.current.push(ref)} />
        ))}
        <Ball ref={ball} />
      </div>
    </>
  );
}

export default GameContainer;
