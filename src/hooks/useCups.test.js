import useCups from "./useCups";
import { renderHook, act } from "@testing-library/react-hooks";

const ref = {
  current: {
    offsetWidth: 70,
  },
};
test("UseCups", () => {
  const { result } = renderHook(() => useCups(ref));
  expect(typeof result.current.setCups).toEqual("function");
  expect(result.current.cups).toMatchInlineSnapshot(`
    Array [
      0,
      1,
      2,
    ]
  `);

  act(() => {
    result.current.setCups([1, 4, 5]);
  });

  expect(result.current.cups).toMatchInlineSnapshot(`
    Array [
      1,
      4,
      5,
    ]
  `);

  expect(result.current.cupsRefs).toHaveProperty("current");

  result.current.cupsPos.forEach((cup) => {
    expect(cup).toHaveProperty("x");
    expect(cup).toHaveProperty("num");
  });
});
