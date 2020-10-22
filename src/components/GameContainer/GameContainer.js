import React, { useEffect, useRef, useState, createRef } from "react";
import { gsap } from "gsap";

import Cup from "./Cup";
import GameActions from "./GameActions/GameActions";
import Ball from "./Ball";

import { generateRandomInt, shuffle } from "../../utils";

import styles from "./GameContainer.module.css";

function GameContainer() {
  const ball = useRef(null);
  const ballTween = useRef(null);

  const [cups, setCups] = useState([0, 1, 2]);
  const cupsRefs = useRef(cups.map(() => createRef()));
  const [cupsPos, setCupsPos] = useState([]);
  const [selectedCup, selectCup] = useState(null);

  const tl = gsap.timeline({ paused: true });

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

    setCupsPos(positions);
  }, []);

  useEffect(() => {
    ballTween.current = gsap.to(ball.current, {
      x: selectedCup?.x,
      ease: "power3.out",
      duration: 1.5,
    });
  }, [selectedCup]);

  const handleStart = (e) => {
    e.preventDefault();

    if (tl.isActive()) return;

    const domCupElemts = cupsRefs.current.map((c) => c.current);
    const randInt = generateRandomInt();
    selectCup(cupsPos[randInt]);

    tl.add(ballTween.current, 0)
      .fromTo(
        domCupElemts,
        { top: 0 },
        {
          top: "102%",
          ease: "power2.out",
          duration: 0.8,
          onComplete: () => {
            setCups((prevCups) => {
              const oldCups = JSON.stringify(prevCups);
              let c = shuffle(cups);
              const newCups = JSON.stringify(c);
              if (oldCups === newCups) {
                c = shuffle(cups);
              }
              return [...c];
            });

            cups.forEach((el, idx) => {
              const prevXPos = Math.ceil(
                cupsPos.find((cup) => cup.num === idx).x +
                  200 -
                  Math.ceil(ball.current.offsetWidth * 4)
              );
              const x =
                Math.ceil(
                  domCupElemts[el].offsetLeft -
                    200 +
                    Math.ceil(ball.current.offsetWidth / 4)
                ) - 40;

              gsap.to(domCupElemts[el], {
                x: prevXPos - x,
                duration: 0.8,
                repeat: 3,
                ease: "power3.inOut",
              });
            });
          },
        },
        "-=0.3"
      )
      .fromTo(ball.current, { alpha: 1 }, { alpha: 0, duration: 0.23 }, "-=0.2")
      .play();
  };

  return (
    <>
      <GameActions onStart={handleStart} />
      <div className={styles.game_container}>
        {cups.map((_, idx) => (
          <Cup
            key={idx}
            ref={cupsRefs.current[idx]}
            hasBall={selectedCup?.num === cupsPos[idx]?.num}>
            {idx}
          </Cup>
        ))}
        <Ball ref={ball} />
      </div>
    </>
  );
}

export default GameContainer;
