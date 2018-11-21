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
