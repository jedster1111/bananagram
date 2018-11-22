import {
  createVector,
  translateVector,
  Vector
} from "../../common/vectorMethods";
import { createSelectSquareAction, GameActions } from "../game/actions";
import {
  createaTranslateSelectorAction,
  createTranslateOffsetAction,
  GridActions
} from "./actions";
import { Dimensions } from "./Grid";

export function handleKeyPresses(
  event: KeyboardEvent,
  gridDispatch: React.Dispatch<GridActions>,
  gameDispatch: React.Dispatch<GameActions>,
  hoveredSquare: Vector,
  offset: Vector,
  dimensions: Dimensions
) {
  const isCtrlPressed = event.getModifierState("Control");
  const { x: absX, y: absY } = translateVector(hoveredSquare, offset);

  switch (event.key) {
    case "ArrowUp": {
      const vector = createVector(0, -1);
      if (isCtrlPressed) {
        gridDispatch(createTranslateOffsetAction(vector));
      } else if (absY !== 0) {
        gridDispatch(createaTranslateSelectorAction(vector));
      }
      break;
    }
    case "ArrowRight": {
      const vector = createVector(1, 0);
      if (isCtrlPressed) {
        gridDispatch(createTranslateOffsetAction(vector));
      } else if (absX !== dimensions.width - 1) {
        gridDispatch(createaTranslateSelectorAction(vector));
      }
      break;
    }
    case "ArrowDown": {
      const vector = createVector(0, 1);
      if (isCtrlPressed) {
        gridDispatch(createTranslateOffsetAction(vector));
      } else if (absY !== dimensions.height - 1) {
        gridDispatch(createaTranslateSelectorAction(vector));
      }
      break;
    }
    case "ArrowLeft": {
      const vector = createVector(-1, 0);
      if (isCtrlPressed) {
        gridDispatch(createTranslateOffsetAction(vector));
      } else if (absX !== 0) {
        gridDispatch(createaTranslateSelectorAction(vector));
      }
      break;
    }
    case "Enter": {
      gameDispatch(createSelectSquareAction(hoveredSquare));
      break;
    }
    default: {
      break;
    }
  }
}