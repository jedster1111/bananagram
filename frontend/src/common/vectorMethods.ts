export interface Vector {
  x: number;
  y: number;
}

/**
 * Returns a vector
 * @example
 * createVector(3, -1) // --> {x: 3, y: -1}
 */
export function createVector(x: number, y: number): Vector {
  return { x, y };
}

/**
 * translates vectorA by vectorB
 * @example
 * translate({x: 1, y: 2}, {x: 5, y: -4}) // --> {x: 6, y: -2}
 */
export function translateVector(vectorA: Vector, vectorB: Vector): Vector {
  return {
    x: vectorA.x + vectorB.x,
    y: vectorA.y + vectorB.y
  };
}

/**
 * Returns the inverse of a vector
 * @param vector The vector to be inverted
 * @param specificAxis Optional paramter to specify the axis to be inverted
 * @example
 * inverse({x: 1, y: 4}) // --> {x: -1, y: -4}
 */
export function inverseVector(
  { x, y }: Vector,
  specificAxis?: "x" | "y"
): Vector {
  if (specificAxis === undefined) {
    return { x: x * -1, y: y * -1 };
  } else {
    return {
      x: x * (specificAxis === "x" ? -1 : 1),
      y: y * (specificAxis === "y" ? -1 : 1)
    };
  }
}

/**
 * Returns true if two vectors have the same x and y values
 * @example
 * isSameVector({x: 1, y: 2}, {x: 1, y: 2}) // --> true
 */
export function isSameVector(vectorA: Vector, vectorB: Vector): boolean {
  return vectorA.x === vectorB.x && vectorA.y === vectorB.y;
}
