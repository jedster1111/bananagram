import { createVector } from "../../common/vectorMethods";
import { Actions, translateOffset, translateSelector, Vector } from "./actions";

export function handleKeyPresses(
  event: KeyboardEvent,
  dispatch: React.Dispatch<Actions>,
  handleSelectSquare: (vector: Vector) => void,
  handlePlaceSquare: (vector: Vector) => void,
  selectedSquare: Vector,
  isSelected: boolean
) {
  const isCtrlPressed = event.getModifierState("Control");
  switch (event.key) {
    case "ArrowUp": {
      const { x, y } = createVector(0, -1);
      dispatch(isCtrlPressed ? translateOffset(x, y) : translateSelector(x, y));
      break;
    }
    case "ArrowRight": {
      const { x, y } = createVector(1, 0);
      dispatch(isCtrlPressed ? translateOffset(x, y) : translateSelector(x, y));
      break;
    }
    case "ArrowDown": {
      const { x, y } = createVector(0, 1);
      dispatch(isCtrlPressed ? translateOffset(x, y) : translateSelector(x, y));
      break;
    }
    case "ArrowLeft": {
      const { x, y } = createVector(-1, 0);
      dispatch(isCtrlPressed ? translateOffset(x, y) : translateSelector(x, y));
      break;
    }
    case "Enter": {
      isSelected
        ? handlePlaceSquare(selectedSquare)
        : handleSelectSquare(selectedSquare);
    }
    default: {
      break;
    }
  }
}
