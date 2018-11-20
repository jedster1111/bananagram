import { Vector } from "../grid/actions";

export enum ActionTypes {
  selectSquare = "SELECT_SQUARE",
  placeSquare = "PLACE_SQUARE"
}

export type Actions = SelectSquareAction | PlaceSquareAction;

export interface SelectSquareAction {
  type: ActionTypes.selectSquare;
  payload: { vector: Vector };
}

export function selectSquare(x: number, y: number): SelectSquareAction {
  return {
    type: ActionTypes.selectSquare,
    payload: { vector: { x, y } }
  };
}

export interface PlaceSquareAction {
  type: ActionTypes.placeSquare;
  payload: { vector: Vector };
}

export function placeSquare(x: number, y: number): PlaceSquareAction {
  return {
    type: ActionTypes.placeSquare,
    payload: { vector: { x, y } }
  };
}
