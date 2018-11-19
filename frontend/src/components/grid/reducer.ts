import { Actions, ActionTypes, Vector } from "./actions";
import { transform } from "./transform";

export interface State {
  offset: Vector;
}

export function getInitialState(): State {
  return {
    offset: {
      x: 0,
      y: 0
    }
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
    default:
      return currentState;
  }
}
