import React, { useEffect, useRef, useState, createRef } from "react";
import { gsap } from "gsap";

import Cup from "./Cup";
import GameActions from "./GameActions/GameActions";
import Ball from "./Ball";

import { generateRandomInt, shuffle } from "../../utils";

import styles from "./GameContainer.module.css";

const cupsIdx = [0, 1, 2];

function GameContainer() {
  const ball = useRef(null);
  const [cups, setCups] = useState(cupsIdx);
  const cupsRefs = useRef(cups.map(() => createRef()));

  const [cupsXPos, setCupsXPos] = useState([]);

  useEffect(() => {
    const positions = [];
    cupsRefs.current.forEach((cup, num) => {
      const { offsetLeft } = cup.current;

      positions.push({
        x: Math.ceil(
          offsetLeft - 200 + Math.ceil(ball.current.offsetWidth / 4)
        ), // Take 200 out from the container padding plus 1/4 from ball width. This way we could have the ball centered inside the cup
        num,
      });
    });

    setCupsXPos(positions);
  }, []);

  const handleStart = (e) => {
    e.preventDefault();
    const randInt = generateRandomInt();
    const selectedCupXPos = cupsXPos[randInt].x;
    const domCupElem = cupsRefs.current.map((c) => c.current);

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setCups(() => {
          const c = shuffle(cups);
          return [...c];
        });
        cups.forEach((el, idx) => {
          const prevXPos =
            cupsXPos.find((cup) => cup.num === idx).x +
            200 -
            Math.ceil(ball.current.offsetWidth * 4);
          const x =
            domCupElem[el].offsetLeft -
            200 +
            Math.ceil(ball.current.offsetWidth / 4) -
            40;

          gsap.to(domCupElem[el], {
            x: prevXPos - x,
            duration: 1,
          });
        });
      },
    });

    if (tl.isActive()) return;

    const ballTween = tl.fromTo(
      ball.current,
      { x: 0 },
      { x: selectedCupXPos, ease: "power3.out", duration: 1.5 }
    );
    const cupsTween = tl.fromTo(
      domCupElem,
      { top: 0 },
      { top: "102%", ease: "power2.out", duration: 0.8 },
      "-=0.3"
    );

    tl.add(ballTween).add(cupsTween).play();
  };

  return (
    <>
      <GameActions onStart={handleStart} />
      <div className={styles.game_container}>
        {cups.map((el, idx) => (
          <Cup key={idx} ref={cupsRefs.current[idx]}>
            {el}
          </Cup>
        ))}
        <Ball ref={ball} />
      </div>
    </>
  );
}

export default GameContainer;
