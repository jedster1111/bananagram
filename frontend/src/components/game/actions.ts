import { Vector } from "../grid/actions";

export enum ActionTypes {
  selectSquare = "SELECT_SQUARE",
  placeSquare = "PLACE_SQUARE",
  clearSelected = "DISCARD_SELECTED"
}

export type GameActions =
  | SelectSquareAction
  | PlaceSquareAction
  | ClearSelectedAction;

export interface SelectSquareAction {
  type: ActionTypes.selectSquare;
  payload: { vector: Vector };
}

export function selectSquare(vector: Vector): SelectSquareAction {
  return {
    type: ActionTypes.selectSquare,
    payload: { vector }
  };
}

export interface PlaceSquareAction {
  type: ActionTypes.placeSquare;
  payload: { vector: Vector };
}

export function placeSquare(vector: Vector): PlaceSquareAction {
  return {
    type: ActionTypes.placeSquare,
    payload: { vector }
  };
}

export interface ClearSelectedAction {
  type: ActionTypes.clearSelected;
}

export function clearSelected(): ClearSelectedAction {
  return {
    type: ActionTypes.clearSelected
  };
}
