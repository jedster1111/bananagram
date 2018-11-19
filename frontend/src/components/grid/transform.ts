import { Vector } from "./actions";

export function transform(vectorA: Vector, vectorB: Vector): Vector {
  return {
    x: vectorA.x + vectorB.x,
    y: vectorA.y + vectorB.y
  };
}
