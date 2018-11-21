import { createVector, translate } from "../../common/vectorMethods";
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
  selectedSquare: Vector,
  offset: Vector,
  dimensions: Dimensions
) {
  const isCtrlPressed = event.getModifierState("Control");

  if (isCtrlPressed) {
    switch (event.key) {
      case "ArrowUp": {
        const { x, y } = createVector(0, -1);
        gridDispatch(translateOffset(x, y));
        break;
      }
      case "ArrowRight": {
        const { x, y } = createVector(1, 0);
        gridDispatch(translateOffset(x, y));
        break;
      }
      case "ArrowDown": {
        const { x, y } = createVector(0, 1);
        gridDispatch(translateOffset(x, y));
        break;
      }
      case "ArrowLeft": {
        const { x, y } = createVector(-1, 0);
        gridDispatch(translateOffset(x, y));
        break;
      }
    }
  } else {
    const { x: absX, y: absY } = translate(selectedSquare, offset);
    switch (event.key) {
      case "ArrowUp": {
        const { x, y } = createVector(0, -1);
        if (absY !== 0) {
          gridDispatch(translateSelector(x, y));
        }
        break;
      }
      case "ArrowRight": {
        const { x, y } = createVector(1, 0);
        if (absX !== dimensions.width - 1) {
          gridDispatch(translateSelector(x, y));
        }
        break;
      }
      case "ArrowDown": {
        const { x, y } = createVector(0, 1);
        if (absY !== dimensions.height - 1) {
          gridDispatch(translateSelector(x, y));
        }
        break;
      }
      case "ArrowLeft": {
        const { x, y } = createVector(-1, 0);
        if (absX !== 0) {
          gridDispatch(translateSelector(x, y));
        }
        break;
      }
      case "Enter": {
        gameDispatch(selectSquare(selectedSquare));
        break;
      }
      default: {
        break;
      }
    }
  }
}
