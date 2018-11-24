import { getValueInSquares } from "../../common/squaresMethods";
import {
  createVector,
  translateVector,
  Vector
} from "../../common/vectorMethods";
import {
  createDeselectGridSquareAction,
  createPlaceGridSquareAction,
  createPlaceGridSquareWithKeyboardAction,
  createSelectGridSquareAction,
  GameActions
} from "../game/actions";
import { Squares } from "../game/Game";
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
  hoveredSquareVector: Vector,
  selectedSquares: Squares | undefined,
  offset: Vector,
  dimensions: Dimensions,
  isActive: boolean
) {
  if (!isActive) {
    return;
  }

  const isCtrlPressed = event.getModifierState("Control");
  const { x: absX, y: absY } = translateVector(hoveredSquareVector, offset);

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
      if (isCtrlPressed) {
        gameDispatch(createPlaceGridSquareAction(hoveredSquareVector));
      } else {
        selectedSquares &&
        getValueInSquares(hoveredSquareVector, selectedSquares)
          ? gameDispatch(createDeselectGridSquareAction(hoveredSquareVector))
          : gameDispatch(createSelectGridSquareAction(hoveredSquareVector));
      }
      break;
    }

    default: {
      if (RegExp(/^[a-z]$/i).test(event.key)) {
        gameDispatch(
          createPlaceGridSquareWithKeyboardAction(
            event.key,
            hoveredSquareVector
          )
        );
      }
      break;
    }
  }
}
