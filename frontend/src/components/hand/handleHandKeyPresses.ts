import {
  createPlaceHandSquareAction,
  createSelectHandSquareAction,
  GameActions
} from "../game/actions";
import { createMoveSelectorAction, HandActions } from "./actions";

export function handleHandKeyPresses(
  event: KeyboardEvent,
  handDispatch: React.Dispatch<HandActions>,
  gameDispatch: React.Dispatch<GameActions>,
  isActive: boolean,
  hoveredSquareIndex: number,
  handCount: number
) {
  if (!isActive) {
    return;
  }

  const isCtrlPressed = event.getModifierState("Control");

  switch (event.key) {
    case "ArrowLeft": {
      if (hoveredSquareIndex !== 0) {
        handDispatch(createMoveSelectorAction(-1));
      }
      break;
    }

    case "ArrowRight": {
      if (hoveredSquareIndex !== handCount - 1) {
        handDispatch(createMoveSelectorAction(1));
      }
      break;
    }

    case "Enter": {
      if (isCtrlPressed) {
        gameDispatch(createPlaceHandSquareAction(hoveredSquareIndex));
      } else {
        gameDispatch(createSelectHandSquareAction(hoveredSquareIndex));
      }
    }

    default: {
      break;
    }
  }
}
