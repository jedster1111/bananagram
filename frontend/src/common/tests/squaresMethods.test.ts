import { Squares } from "../../components/game/Game";
import {
  deepCloneSquaresColumns,
  getValueInSquares,
  setSquareValue
} from "../squaresMethods";
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

describe("Testing deepCloneSquaresColumns", () => {
  it("should return a deep cloned squares object", () => {
    const squares = createSquares();
    const clonedSquares = deepCloneSquaresColumns(squares, 1, 2);

    expect(squares).toEqual(clonedSquares);
    expect(squares).not.toBe(clonedSquares);
    expect(squares[1]).not.toBe(clonedSquares[1]);
    expect(squares[2]).not.toBe(clonedSquares[2]);
  });

  it("should return a copy of squares with only 1 column deep cloned", () => {
    const squares = createSquares();
    const clonedSquares = deepCloneSquaresColumns(squares, 1);

    expect(squares).toEqual(clonedSquares);
    expect(squares).not.toBe(clonedSquares);
    expect(squares[1]).not.toBe(clonedSquares[1]);
    expect(squares[2]).toBe(clonedSquares[2]);
  });
});

describe("Testing getValueInSquares", () => {
  it("should return the value of the square at a given vector", () => {
    expect(getValueInSquares(createVector(1, 2), createSquares())).toBe("A");
  });

  it("should return undefined if row in column is undefined", () => {
    expect(
      getValueInSquares(createVector(1, 20), createSquares())
    ).toBeUndefined();
  });

  it("should return undefined if column doesn't exist", () => {
    expect(
      getValueInSquares(createVector(20, 1), createSquares())
    ).toBeUndefined();
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
