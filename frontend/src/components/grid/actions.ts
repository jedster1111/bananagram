import {
  VectorAction,
  vectorActionCreatorFactory
} from "../../common/vectorActionFactory";

export enum ActionTypes {
  translateOffset = "TRANSLATE_OFFSET",
  translateSelector = "TRANSLATE_SELECTOR",
  setSelectorPosition = "SET_SELECTOR_POSITION"
}

export type GridActions =
  | TranslateOffsetAction
  | TranslateSelectorAction
  | SetSelectorAction;

export type TranslateOffsetAction = VectorAction<ActionTypes.translateOffset>;

export const createTranslateOffsetAction = vectorActionCreatorFactory<
  ActionTypes.translateOffset
>(ActionTypes.translateOffset);

export type TranslateSelectorAction = VectorAction<
  ActionTypes.translateSelector
>;

export const createTranslateSelectorAction = vectorActionCreatorFactory<
  ActionTypes.translateSelector
>(ActionTypes.translateSelector);

export type SetSelectorAction = VectorAction<ActionTypes.setSelectorPosition>;

export const createSetSelectorAction = vectorActionCreatorFactory<
  ActionTypes.setSelectorPosition
>(ActionTypes.setSelectorPosition);
