import { createVector, translate } from "../../common/vectorMethods";
import { Actions, translateOffset, translateSelector, Vector } from "./actions";
import { Dimensions } from "./Grid";

export function handleKeyPresses(
  event: KeyboardEvent,
  dispatch: React.Dispatch<Actions>,
  handleSelectSquare: (vector: Vector) => void,
  handlePlaceSquare: (vector: Vector) => void,
  selectedSquare: Vector,
  offset: Vector,
  isSelected: boolean,
  dimensions: Dimensions
) {
  const isCtrlPressed = event.getModifierState("Control");

  if (isCtrlPressed) {
    switch (event.key) {
      case "ArrowUp": {
        const { x, y } = createVector(0, -1);
        dispatch(translateOffset(x, y));
        break;
      }
      case "ArrowRight": {
        const { x, y } = createVector(1, 0);
        dispatch(translateOffset(x, y));
        break;
      }
      case "ArrowDown": {
        const { x, y } = createVector(0, 1);
        dispatch(translateOffset(x, y));
        break;
      }
      case "ArrowLeft": {
        const { x, y } = createVector(-1, 0);
        dispatch(translateOffset(x, y));
        break;
      }
    }
  } else {
    const { x: absX, y: absY } = translate(selectedSquare, offset);
    switch (event.key) {
      case "ArrowUp": {
        const { x, y } = createVector(0, -1);
        if (absY !== 0) {
          dispatch(translateSelector(x, y));
        }
        break;
      }
      case "ArrowRight": {
        const { x, y } = createVector(1, 0);
        if (absX !== dimensions.width - 1) {
          dispatch(translateSelector(x, y));
        }
        break;
      }
      case "ArrowDown": {
        const { x, y } = createVector(0, 1);
        if (absY !== dimensions.height - 1) {
          dispatch(translateSelector(x, y));
        }
        break;
      }
      case "ArrowLeft": {
        const { x, y } = createVector(-1, 0);
        if (absX !== 0) {
          dispatch(translateSelector(x, y));
        }
        break;
      }
      case "Enter": {
        isSelected
          ? handlePlaceSquare(selectedSquare)
          : handleSelectSquare(selectedSquare);
        break;
      }
      default: {
        break;
      }
    }
  }
}
