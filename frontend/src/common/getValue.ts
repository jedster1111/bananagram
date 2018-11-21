import { Squares } from "../components/game/Game";
import { Vector } from "../components/grid/actions";

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
