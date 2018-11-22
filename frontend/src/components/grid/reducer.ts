import { createVector, inverse, translate } from "../../common/vectorMethods";
import { ActionTypes, GridActions, Vector } from "./actions";

export interface State {
  offset: Vector;
  hoveredSquare: Vector;
}

export function getInitialState(): State {
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
        offset: translate(currentState.offset, vector),
        hoveredSquare: translate(currentState.hoveredSquare, inverse(vector)) // prevent selected square from moving
      };
    }

    case ActionTypes.translateSelector: {
      const newActualPosition = translate(
        currentState.hoveredSquare,
        action.payload.vector
      );

      return {
        ...currentState,
        hoveredSquare: newActualPosition
      };
    }
    default:
      return currentState;
  }
}
