import {
  createVector,
  // inverseVector,
  translateVector
} from "../../common/vectorMethods";
import { ActionTypes, GridActions } from "./actions";
import { State } from "./Grid";

export function createInitialState(): State {
  return {
    offset: createVector(0, 0),
    hoveredSquare: createVector(0, 0)
  };
}

export function reducer(currentState: State, action: GridActions): State {
  switch (action.type) {
    case ActionTypes.translateOffset: {
      const vector = action.payload.vector;
      return {
        ...currentState,
        offset: translateVector(currentState.offset, vector)
      };
    }

    case ActionTypes.translateSelector: {
      const newActualPosition = translateVector(
        currentState.hoveredSquare,
        action.payload.vector
      );

      return {
        ...currentState,
        hoveredSquare: newActualPosition
      };
    }

    case ActionTypes.setSelectorPosition: {
      return {
        ...currentState,
        hoveredSquare: action.payload.vector
      };
    }

    default:
      return currentState;
  }
}
