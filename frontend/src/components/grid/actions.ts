export enum ActionTypes {
  translateOffset = "TRANSLATE_OFFSET",
  translateSelector = "TRANSLATE_SELECTOR"
}

export type Actions = TranslateOffsetAction | TranslateSelectorAction;

export interface Vector {
  x: number;
  y: number;
}

export interface TranslateOffsetAction {
  type: ActionTypes.translateOffset;
  payload: { vector: Vector };
}

export function translateOffset(x: number, y: number): TranslateOffsetAction {
  return {
    type: ActionTypes.translateOffset,
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
