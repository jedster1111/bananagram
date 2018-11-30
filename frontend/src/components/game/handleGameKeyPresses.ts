import { Dispatch } from "react";
import { Key } from "ts-key-enum";
import {
  createClearSelectedAction,
  createMakeActiveAction,
  GameActions
} from "./actions";
import { ActiveTypes } from "./Game";

export function handleGameKeyPresses(
  event: KeyboardEvent,
  dispatch: Dispatch<GameActions>,
  isGridActive: boolean
) {
  switch (event.key) {
    case " ": {
      dispatch(
        createMakeActiveAction(
          isGridActive ? ActiveTypes.hand : ActiveTypes.grid
        )
      );
      break;
    }
    case Key.Escape: {
      dispatch(createClearSelectedAction());
      break;
    }
    default: {
      break;
    }
  }
}
