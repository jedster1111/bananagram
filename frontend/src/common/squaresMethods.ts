import { Squares } from "../components/game/Game";
import { Vector } from "../components/grid/actions";

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
export function getValue(vector: Vector, squares: Squares): string | undefined {
  const column = squares[vector.x];
  if (!column) {
    return undefined;
  }
  return column[vector.y];
}

export function doesVectorExistInSquares(
  { x, y }: Vector,
  squares: Squares | undefined
): boolean {
  return (
    squares !== undefined &&
    squares[x] !== undefined &&
    squares[x]![y] !== undefined // why do I need ! here, is there a way around it
  );
}
