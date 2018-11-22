import { Vector } from "./vectorMethods";

export interface VectorAction<T> {
  type: T;
  payload: { vector: Vector };
}

export function vectorActionCreatorFactory<T>(
  type: T
): (vector: Vector) => VectorAction<T> {
  return (vector: Vector) => ({
    type,
    payload: { vector }
  });
}
