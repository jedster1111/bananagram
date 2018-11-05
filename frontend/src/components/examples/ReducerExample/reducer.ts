import uuid from "uuid/v4";
import { Action, ActionTypes } from "./actions";

export interface Square {
  id: string;
  value: string;
}
export interface State {
  squares: Square[];
}

function reducer(currentState: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.AddSquare: {
      return {
        ...currentState,
        squares: [
          generateNewSquare(action.payload.value),
          ...currentState.squares
        ]
      };
    }
    case ActionTypes.RemoveSquare: {
      return {
        ...currentState,
        squares: currentState.squares.filter(
          square => square.id !== action.payload.id
        )
      };
    }
    default:
      return currentState;
  }
}

export function getInitialState(): State {
  return {
    squares: [generateNewSquare("Initial Square!")]
  };
}

export function generateNewSquare(value: string): Square {
  return { id: uuid(), value };
}

export default reducer;
