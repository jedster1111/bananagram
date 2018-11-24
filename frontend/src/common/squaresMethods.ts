import { Squares } from "../components/game/Game";
import { Vector } from "./vectorMethods";

/**
 * Sets the value of the square at the specified vector.
 * @returns A copy of the squares with the new value.
 * Note only the effected column will be deep cloned,
 * the remaining columns will still be references.
 */
export function setSquareValue(
  vector: Vector,
  value: string | undefined,
  squares: Squares
) {
  const newSquares = deepCloneSquaresColumns(squares, vector.x);
  let column = newSquares[vector.x];
  if (!column) {
    column = { [vector.y]: value };
  } else {
    column[vector.y] = value;
  }

  if (Object.values(column).every(row => row === undefined)) {
    newSquares[vector.x] = undefined;
  }

  console.log(Object.keys(column));
  return newSquares;
}

/**
 * returns squares, with only the specified columns having been deep cloned.
 * The remaining columns will be shallow cloned.
 */
export function deepCloneSquaresColumns(
  squares: Squares,
  ...columnNumbers: number[]
): Squares {
  const clonedSquares = { ...squares };

  columnNumbers.forEach(columnNumber => {
    clonedSquares[columnNumber] = { ...clonedSquares[columnNumber] };
  });

  return clonedSquares;
}

/**
 * Returns the value at a specific vector within a grid of squares.
 * @example
 * getValue({x: 1, y: 2}, {1: {2: "A", 3:"B"}}) // --> "A"
 * getValue({x: 0, y: 2}), {1: {2: "A", 3: "B"}} // --> undefined
 */
export function getValueInSquares(
  vector: Vector,
  squares: Squares
): string | undefined {
  const column = squares[vector.x];
  if (!column) {
    return undefined;
  }
  return column[vector.y];
}
