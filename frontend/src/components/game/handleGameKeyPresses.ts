import { Dispatch } from "react";
import {
  createClearSelectedAction,
  createMakeActiveAction,
  GameActions
} from "./actions";

export function handleGameKeyPresses(
  event: KeyboardEvent,
  dispatch: Dispatch<GameActions>,
  isGridActive: boolean
) {
  switch (event.key) {
    case " ": {
      dispatch(createMakeActiveAction(isGridActive ? "hand" : "grid"));
      break;
    }
    case "Escape": {
      dispatch(createClearSelectedAction());
      break;
    }
    default: {
      break;
    }
  }
}
