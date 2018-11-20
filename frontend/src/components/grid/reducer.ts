import { Actions, ActionTypes, Vector } from "./actions";
import { transform } from "./transform";

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
    case ActionTypes.transformOffset: {
      return {
        ...currentState,
        offset: transform(currentState.offset, action.payload.vector)
      };
    }
    case ActionTypes.translateSelector: {
      return {
        ...currentState,
        selectedSquare: transform(
          currentState.selectedSquare,
          action.payload.vector
        )
      };
    }
    default:
      return currentState;
  }
}

export function createVector(x: number, y: number): Vector {
  return { x, y };
}
