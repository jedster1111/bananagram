import { Vector } from "../grid/actions";
import { Actions, ActionTypes } from "./actions";
import { Squares } from "./Game";

export interface Selected {
  originalPosition: Vector;
  value: string;
}

export interface State {
  squares: Squares;
  selected: Selected | undefined;
}

export function getInitialState(): State {
  return {
    selected: undefined,
    squares: {
      // 2: { 5: "W" },
      3: { 1: "H", 2: "E", 3: "L", 4: "L", 5: "O" }
      // 4: { 3: "O", 5: "W" },
      // 5: { 3: "L" }
    }
  };
}

export function reducer(currentState: State, action: Actions): State {
  switch (action.type) {
    case ActionTypes.selectSquare: {
      const { x, y } = action.payload.vector;
      const selectedSquare = currentState.squares[x][y];

      if (!selectedSquare) {
        return currentState;
      }

      return {
        ...currentState,
        selected: {
          ...currentState.selected,
          originalPosition: { x, y },
          value: selectedSquare
        }
      };
    }
    case ActionTypes.placeSquare: {
      const { x: xNew, y: yNew } = action.payload.vector;

      if (
        !currentState.selected ||
        (currentState.squares[xNew] && currentState.squares[xNew][yNew])
      ) {
        return currentState;
      }

      const { x: xOrig, y: yOrig } = currentState.selected.originalPosition;
      const newSquares = { ...currentState.squares };

      newSquares[xOrig] = { ...currentState.squares[xOrig] };
      newSquares[xOrig][yOrig] = undefined;

      if (xOrig !== xNew) {
        newSquares[xNew] = { ...currentState.squares[xNew] };
      }
      newSquares[xNew][yNew] = currentState.selected.value;

      return {
        ...currentState,
        selected: undefined,
        squares: newSquares
      };
    }
    default: {
      return currentState;
    }
  }
}
