import { Squares } from "../../components/game/Game";
import { doesVectorExistInSquares } from "../squaresMethods";
import { createVector } from "../vectorMethods";

describe("Testing  doesVectorExistInSquares", () => {
  const squares: Squares = {
    1: {
      2: "A"
    }
  };

  it("should return true if vector is inside of Squares", () => {
    expect(doesVectorExistInSquares(createVector(1, 2), squares)).toBe(true);
  });

  it("should return false if vector is not inside of Square", () => {
    expect(doesVectorExistInSquares(createVector(1, 3), squares)).toBe(false);
  });

  it("should return false if Squares are undefined", () => {
    expect(doesVectorExistInSquares(createVector(1, 5), undefined)).toBe(false);
  });
});
