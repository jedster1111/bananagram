import { ActionTypes, HandActions } from "./actions";
import { State } from "./Hand";

export function createInitialState(): State {
  return {
    hoveredSquareIndex: 0
  };
}
export function reducer(currentState: State, action: HandActions): State {
  switch (action.type) {
    case ActionTypes.moveSelector: {
      return {
        ...currentState,
        hoveredSquareIndex:
          currentState.hoveredSquareIndex + action.payload.steps
      };
    }
    default: {
      return currentState;
    }
  }
}
