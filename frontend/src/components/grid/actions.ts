export enum ActionTypes {
  transformOffset = "TRANSFORM_OFFSET",
  translateSelector = "TRANSLATE_SELECTOR"
}

export type Actions = TransformOffsetAction | TranslateSelectorAction;

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

export interface TranslateSelectorAction {
  type: ActionTypes.translateSelector;
  payload: { vector: Vector };
}

export function translateSelector(
  x: number,
  y: number
): TranslateSelectorAction {
  return {
    type: ActionTypes.translateSelector,
    payload: { vector: { x, y } }
  };
}
