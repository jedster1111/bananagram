export enum ActionTypes {
  transformOffset = "TRANSFORM_OFFSET"
}

export type Actions = TransformOffsetAction;

export interface Vector {
  x: number;
  y: number;
}

export interface TransformOffsetAction {
  type: ActionTypes.transformOffset;
  payload: { vector: Vector };
}

export function transformOffset(x: number, y: number): TransformOffsetAction {
  return {
    type: ActionTypes.transformOffset,
    payload: { vector: { x, y } }
  };
}
