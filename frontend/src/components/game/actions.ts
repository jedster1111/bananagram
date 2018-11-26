import {
  VectorAction,
  vectorActionCreatorFactory
} from "../../common/vectorActionFactory";
import { Vector } from "../../common/vectorMethods";
import { ActiveTypes } from "./Game";

export enum ActionTypes {
  selectGridSquare = "SELECT_GRID_SQUARE",
  deselectGridSquare = "DESELECT_GRID_SQUARE",
  placeGridSquare = "PLACE_GRID_SQUARE",
  placeGridSquareWithKeyboard = "PLACE_GRID_SQUARE_WITH_KEYBOARD",
  placeHandSquare = "PLACE_HAND_SQUARE",
  clearSelected = "DISCARD_SELECTED",
  makeActive = "MAKE_ACTIVE",
  sendHoveredToHand = "SEND_HOVERED_TO_HAND",
  selectHandSquare = "SELECT_HAND_SQUARE",
  setIsOffsetInverted = "SET_IS_OFFSET_INVERTED"
}

export type GameActions =
  | SelectGridSquareAction
  | DeselectGridSquareAction
  | SelectHandSquareAction
  | PlaceGridSquareAction
  | PlaceGridSquareWithKeyboardAction
  | PlaceHandSquareAction
  | ClearSelectedAction
  | SendHoveredToHandAction
  | MakeActiveAction
  | SetIsOffsetAction;

export type SelectGridSquareAction = VectorAction<ActionTypes.selectGridSquare>;

export const createSelectGridSquareAction = vectorActionCreatorFactory<
  ActionTypes.selectGridSquare
>(ActionTypes.selectGridSquare);

export type DeselectGridSquareAction = VectorAction<
  ActionTypes.deselectGridSquare
>;

export const createDeselectGridSquareAction = vectorActionCreatorFactory<
  ActionTypes.deselectGridSquare
>(ActionTypes.deselectGridSquare);

export type PlaceGridSquareAction = VectorAction<ActionTypes.placeGridSquare>;

export const createPlaceGridSquareAction = vectorActionCreatorFactory<
  ActionTypes.placeGridSquare
>(ActionTypes.placeGridSquare);

export interface PlaceGridSquareWithKeyboardAction {
  type: ActionTypes.placeGridSquareWithKeyboard;
  payload: { key: string; vector: Vector };
}

export function createPlaceGridSquareWithKeyboardAction(
  key: string,
  vector: Vector
): PlaceGridSquareWithKeyboardAction {
  return {
    type: ActionTypes.placeGridSquareWithKeyboard,
    payload: { key, vector }
  };
}

export interface PlaceHandSquareAction {
  type: ActionTypes.placeHandSquare;
  payload: { index: number };
}

export function createPlaceHandSquareAction(
  index?: number
): PlaceHandSquareAction {
  return {
    type: ActionTypes.placeHandSquare,
    payload: { index: index || 0 }
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

export type SendHoveredToHandAction = VectorAction<
  ActionTypes.sendHoveredToHand
>;

export const createSendHoveredToHandAction = vectorActionCreatorFactory<
  ActionTypes.sendHoveredToHand
>(ActionTypes.sendHoveredToHand);

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

export interface SetIsOffsetAction {
  type: ActionTypes.setIsOffsetInverted;
  payload: { isOffsetControlsInverted: boolean };
}

export function createSetIsOffsetAction(
  isOffsetControlsInverted: boolean
): SetIsOffsetAction {
  return {
    type: ActionTypes.setIsOffsetInverted,
    payload: { isOffsetControlsInverted }
  };
}
