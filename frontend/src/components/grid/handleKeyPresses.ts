import { createVector, translateVector } from "../../common/vectorMethods";
import { GameActions, selectSquare } from "../game/actions";
import {
  GridActions,
  translateOffset,
  translateSelector,
  Vector
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
      const { x, y } = createVector(0, -1);
      if (isCtrlPressed) {
        gridDispatch(translateOffset(x, y));
      } else if (absY !== 0) {
        gridDispatch(translateSelector(x, y));
      }
      break;
    }
    case "ArrowRight": {
      const { x, y } = createVector(1, 0);
      if (isCtrlPressed) {
        gridDispatch(translateOffset(x, y));
      } else if (absX !== dimensions.width - 1) {
        gridDispatch(translateSelector(x, y));
      }
      break;
    }
    case "ArrowDown": {
      const { x, y } = createVector(0, 1);
      if (isCtrlPressed) {
        gridDispatch(translateOffset(x, y));
      } else if (absY !== dimensions.height - 1) {
        gridDispatch(translateSelector(x, y));
      }
      break;
    }
    case "ArrowLeft": {
      const { x, y } = createVector(-1, 0);
      if (isCtrlPressed) {
        gridDispatch(translateOffset(x, y));
      } else if (absX !== 0) {
        gridDispatch(translateSelector(x, y));
      }
      break;
    }
    case "Enter": {
      gameDispatch(selectSquare(hoveredSquare));
      break;
    }
    default: {
      break;
    }
  }
}
