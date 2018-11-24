import {
  VectorAction,
  vectorActionCreatorFactory
} from "../../common/vectorActionFactory";
import { ActiveTypes } from "./Game";

export enum ActionTypes {
  selectSquare = "SELECT_SQUARE",
  deselectSquare = "DESELECT_SQUARE",
  placeSquare = "PLACE_SQUARE",
  placeHandSquare = "PLACE_HAND_SQUARE",
  clearSelected = "DISCARD_SELECTED",
  makeActive = "MAKE_ACTIVE",
  selectHandSquare = "SELECT_HAND_SQUARE"
}

export type GameActions =
  | SelectSquareAction
  | SelectHandSquareAction
  | PlaceSquareAction
  | PlaceHandSquareAction
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

export interface PlaceHandSquareAction {
  type: ActionTypes.placeHandSquare;
  payload: { index: number };
}

export function createPlaceHandSquareAction(
  index: number
): PlaceHandSquareAction {
  return {
    type: ActionTypes.placeHandSquare,
    payload: { index }
  };
}

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

export interface SelectHandSquareAction {
  type: ActionTypes.selectHandSquare;
  payload: { index: number };
}

export function createSelectHandSquareAction(
  index: number
): SelectHandSquareAction {
  return {
    type: ActionTypes.selectHandSquare,
    payload: { index }
  };
}
