import {
  VectorAction,
  vectorActionCreatorFactory
} from "../../common/vectorActionFactory";
import { ActiveTypes } from "./Game";

export enum ActionTypes {
  selectSquare = "SELECT_SQUARE",
  deselectSquare = "DESELECT_SQUARE",
  placeSquare = "PLACE_SQUARE",
  clearSelected = "DISCARD_SELECTED",
  makeActive = "MAKE_ACTIVE"
}

export type GameActions =
  | SelectSquareAction
  | PlaceSquareAction
  | ClearSelectedAction
  | MakeActiveAction;

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

export function createClearSelectedAction(): ClearSelectedAction {
  return {
    type: ActionTypes.clearSelected
  };
}

export interface MakeActiveAction {
  type: ActionTypes.makeActive;
  payload: { makeActive: ActiveTypes };
}

export function createMakeActiveAction(
  makeActive: ActiveTypes
): MakeActiveAction {
  return {
    type: ActionTypes.makeActive,
    payload: { makeActive }
  };
}
