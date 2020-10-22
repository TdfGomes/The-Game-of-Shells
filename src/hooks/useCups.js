import { useState, useRef, createRef, useEffect } from "react";
import { MathUtils } from "../utils";

function useCups(ballRef) {
  const [cups, setCups] = useState([0, 1, 2]);
  const cupsRefs = useRef(cups.map(() => createRef()));
  const [cupsPos, setCupsPos] = useState([]);
  useEffect(() => {
    const positions = [];
    cupsRefs.current.forEach((cup, num) => {
      const { offsetLeft } = cup.current;

      positions.push({
        x: MathUtils.minusOffset(offsetLeft, ballRef.current.offsetWidth),
        num,
      });
    });

    setCupsPos(positions);
  }, [ballRef]);

  return {
    cups,
    setCups,
    cupsRefs,
    cupsPos,
  };
}

export default useCups;
