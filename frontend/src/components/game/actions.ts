import {
  VectorAction,
  vectorActionCreatorFactory
} from "../../common/vectorActionFactory";

export enum ActionTypes {
  selectSquare = "SELECT_SQUARE",
  deselectSquare = "DESELECT_SQUARE",
  placeSquare = "PLACE_SQUARE",
  clearSelected = "DISCARD_SELECTED"
}

export type GameActions =
  | SelectSquareAction
  | PlaceSquareAction
  | ClearSelectedAction;

export type SelectSquareAction = VectorAction<ActionTypes.selectSquare>;

export const createSelectSquareAction = vectorActionCreatorFactory<
  ActionTypes.selectSquare
>(ActionTypes.selectSquare);

export type PlaceSquareAction = VectorAction<ActionTypes.placeSquare>;

export const createPlaceSquareAction = vectorActionCreatorFactory<
  ActionTypes.placeSquare
>(ActionTypes.placeSquare);

export interface ClearSelectedAction {
  type: ActionTypes.clearSelected;
}

export function clearSelected(): ClearSelectedAction {
  return {
    type: ActionTypes.clearSelected
  };
}
