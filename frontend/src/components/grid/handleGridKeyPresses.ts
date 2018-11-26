import { Key } from "ts-key-enum";
import { getValueInSquares } from "../../common/squaresMethods";
import {
  createVector,
  inverseVector,
  translateVector,
  Vector
} from "../../common/vectorMethods";
import {
  createDeselectGridSquareAction,
  createPlaceGridSquareAction,
  createPlaceGridSquareWithKeyboardAction,
  createPlaceHandSquareAction,
  createSelectGridSquareAction,
  createSendHoveredToHandAction,
  GameActions
} from "../game/actions";
import { Squares } from "../game/Game";
import {
  createTranslateOffsetAction,
  createTranslateSelectorAction,
  GridActions
} from "./actions";
import { Dimensions } from "./Grid";

export function handleKeyPresses(
  event: KeyboardEvent,
  gridDispatch: React.Dispatch<GridActions>,
  gameDispatch: React.Dispatch<GameActions>,
  hoveredSquareVector: Vector,
  selectedSquares: Squares | undefined,
  isSelectedHandSquare: boolean,
  offset: Vector,
  dimensions: Dimensions,
  isActive: boolean,
  isOffsetControlsInverted: boolean
) {
  if (!isActive) {
    return;
  }

  const isCtrlPressed = event.ctrlKey;
  const isShiftPressed = event.shiftKey;
  const gameSquareVector = translateVector(
    hoveredSquareVector,
    inverseVector(offset)
  );

  switch (event.key) {
    case Key.ArrowUp: {
      const vector = createVector(0, -1);
      if (isCtrlPressed) {
        gridDispatch(
          createTranslateOffsetAction(
            isOffsetControlsInverted ? inverseVector(vector) : vector
          )
        );
      } else if (hoveredSquareVector.y !== 0) {
        gridDispatch(createTranslateSelectorAction(vector));
      }
      break;
    }
    case Key.ArrowRight: {
      const vector = createVector(1, 0);
      if (isCtrlPressed) {
        gridDispatch(
          createTranslateOffsetAction(
            isOffsetControlsInverted ? inverseVector(vector) : vector
          )
        );
      } else if (hoveredSquareVector.x !== dimensions.width - 1) {
        gridDispatch(createTranslateSelectorAction(vector));
      }
      break;
    }
    case Key.ArrowDown: {
      const vector = createVector(0, 1);
      if (isCtrlPressed) {
        gridDispatch(
          createTranslateOffsetAction(
            isOffsetControlsInverted ? inverseVector(vector) : vector
          )
        );
      } else if (hoveredSquareVector.y !== dimensions.height - 1) {
        gridDispatch(createTranslateSelectorAction(vector));
      }
      break;
    }
    case Key.ArrowLeft: {
      const vector = createVector(-1, 0);
      if (isCtrlPressed) {
        gridDispatch(
          createTranslateOffsetAction(
            isOffsetControlsInverted ? inverseVector(vector) : vector
          )
        );
      } else if (hoveredSquareVector.x !== 0) {
        gridDispatch(createTranslateSelectorAction(vector));
      }
      break;
    }
    case Key.Enter: {
      if (isShiftPressed) {
        selectedSquares && getValueInSquares(gameSquareVector, selectedSquares)
          ? gameDispatch(createDeselectGridSquareAction(gameSquareVector))
          : gameDispatch(createSelectGridSquareAction(gameSquareVector));
      } else {
        if (selectedSquares || isSelectedHandSquare) {
          gameDispatch(createPlaceGridSquareAction(gameSquareVector));
        } else {
          gameDispatch(createSelectGridSquareAction(gameSquareVector));
        }
      }
      break;
    }
    case Key.Backspace:
    case "Delete": {
      selectedSquares
        ? gameDispatch(createPlaceHandSquareAction())
        : gameDispatch(createSendHoveredToHandAction(gameSquareVector));
      break;
    }

    default: {
      if (RegExp(/^[a-z]$/i).test(event.key)) {
        gameDispatch(
          createPlaceGridSquareWithKeyboardAction(event.key, gameSquareVector)
        );
      }
      break;
    }
  }
}
