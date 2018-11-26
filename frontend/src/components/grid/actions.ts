import {
  VectorAction,
  vectorActionCreatorFactory
} from "../../common/vectorActionFactory";

export enum ActionTypes {
  translateOffset = "TRANSLATE_OFFSET",
  translateSelector = "TRANSLATE_SELECTOR"
}

export type GridActions = TranslateOffsetAction | TranslateSelectorAction;

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
