import { createVector, inverse, translate } from "../../common/vectorMethods";
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
      const vector = action.payload.vector;
      return {
        ...currentState,
        offset: translate(currentState.offset, vector),
        selectedSquare: translate(currentState.selectedSquare, inverse(vector)) // prevent selected square from moving
      };
    }

    case ActionTypes.translateSelector: {
      const newActualPosition = translate(
        currentState.selectedSquare,
        action.payload.vector
      );

      return {
        ...currentState,
        selectedSquare: newActualPosition
      };
    }
    default:
      return currentState;
  }
}
