import { createVector, translate } from "../../common/vectorMethods";
import { Actions, ActionTypes, Vector } from "./actions";

export interface State {
  offset: Vector;
  selectedSquare: Vector;
}

export function getInitialState(): State {
  return {
    offset: createVector(0, 0),
    selectedSquare: createVector(0, 0)
  };
}

export function reducer(currentState: State, action: Actions): State {
  switch (action.type) {
    case ActionTypes.translateOffset: {
      return {
        ...currentState,
        offset: translate(currentState.offset, action.payload.vector)
      };
    }
    case ActionTypes.translateSelector: {
      return {
        ...currentState,
        selectedSquare: translate(
          currentState.selectedSquare,
          action.payload.vector
        )
      };
    }
    default:
      return currentState;
  }
}
