import { Squares } from "../../components/game/Game";
import { setSquareValue } from "../squaresMethods";
import { createVector } from "../vectorMethods";

describe("Testing setSquareValue", () => {
  it("should return the same squares but with an replaced value", () => {
    const inputSquare = createSquares();
    const outputSquare = createSquares();
    outputSquare[1]![2] = "C";

    expect(setSquareValue(createVector(1, 2), "C", inputSquare)).toEqual(
      outputSquare
    );
  });

  it("should return squares with a new value", () => {
    const inputSquare = createSquares();
    const outputSquare = createSquares();
    outputSquare[1]![20] = "A";

    expect(setSquareValue(createVector(1, 20), "A", inputSquare)).toEqual(
      outputSquare
    );
  });
});

function createSquares(): Squares {
  return {
    1: {
      2: "A"
    },
    2: {
      3: "B"
    }
  };
}
