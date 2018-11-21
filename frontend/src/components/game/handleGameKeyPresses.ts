import { Dispatch } from "react";
import { clearSelected, GameActions } from "./actions";

export function handleGameKeyPresses(
  event: KeyboardEvent,
  dispatch: Dispatch<GameActions>
) {
  switch (event.key) {
    case "Escape": {
      dispatch(clearSelected());
      break;
    }
    default: {
      break;
    }
  }
}
