import React, { useEffect, useRef, useState, createRef } from "react";
import { gsap } from "gsap";

import Cup from "./Cup";
import GameActions from "./GameActions/GameActions";
import Ball from "./Ball";

import { generateRandomInt, MathUtils, shuffle, constants } from "../../utils";

import styles from "./GameContainer.module.css";
import GameStatus from "./GameStatus/GameStatus";
import useCups from "../../hooks/useCups";

const { GAME_STATUS } = constants;

function GameContainer() {
  const ball = useRef(null);
  const ballTween = useRef(null);

  const [selectedCup, selectCup] = useState(null);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.none);

  const { cups, setCups, cupsRefs, cupsPos } = useCups(ball);

  useEffect(() => {
    ballTween.current = gsap.to(ball.current, {
      x: selectedCup?.x,
      ease: "power3.out",
      duration: 1.5,
    });
  }, [selectedCup]);

  const handleStart = (e) => {
    e.preventDefault();
    const tl = gsap.timeline({ paused: true });
    setGameStatus(GAME_STATUS.started);
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

            const selCup = domCupElemts.find(
              (el) => el.attributes.hasBall.value === "true"
            );
            const c = cups.indexOf(Number(selCup.textContent));

            cups.forEach((el, idx) => {
              const prevXPos = MathUtils.addOffset(
                cupsPos.find((cup) => cup.num === idx).x,
                ball.current.offsetWidth
              );

              const x =
                MathUtils.minusOffset(
                  domCupElemts[el].offsetLeft,
                  ball.current.offsetWidth
                ) - 40;

              gsap
                .timeline()
                .to(domCupElemts[el], {
                  x: prevXPos - x,
                  duration: 0.8,
                  repeat: 3,
                  ease: "power3.inOut",
                })
                .to(ball.current, {
                  x: cupsPos[c].x,
                  duration: 0.1,
                })
                .fromTo(ball.current, { alpha: 0 }, { alpha: 1 })
                .play();
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
            hasBall={selectedCup?.num === cupsPos[idx]?.num}
            gameStatus={gameStatus}
            onClick={setGameStatus}>
            {idx}
          </Cup>
        ))}
        <Ball ref={ball} />
        {(gameStatus === GAME_STATUS.gameOver ||
          gameStatus === GAME_STATUS.win) && (
          <GameStatus gameStatus={gameStatus} />
        )}
      </div>
    </>
  );
}

export default GameContainer;
