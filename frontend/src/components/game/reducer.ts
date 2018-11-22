import { getValueInSquares, setSquareValue } from "../../common/squaresMethods";
import { Vector } from "../grid/actions";
import { ActionTypes, GameActions } from "./actions";
import { Squares } from "./Game";

export interface Selected {
  originalPosition: Vector;
  squares: Squares;
}

export interface State {
  squares: Squares;
  selected: Selected | undefined;
  error: string | undefined;
}

export function getInitialState(): State {
  return {
    selected: undefined,
    squares: {
      2: { 5: "W" },
      3: { 1: "H", 2: "E", 3: "L", 4: "L", 5: "O" },
      4: { 3: "O", 5: "W" },
      5: { 3: "L" }
    },
    error: undefined
  };
}

export function reducer(currentState: State, action: GameActions): State {
  switch (action.type) {
    case ActionTypes.selectSquare: {
      const selectedSquare = action.payload.vector;

      const selectedSquareValue = getValueInSquares(
        selectedSquare,
        currentState.squares
      );

      if (!selectedSquareValue) {
        return {
          ...currentState,
          error: "Can't select, there's no tile there!"
        };
      }

      const originalPosition =
        currentState.selected === undefined
          ? selectedSquare
          : currentState.selected.originalPosition;

      const newSquares =
        currentState.selected === undefined
          ? setSquareValue(selectedSquare, selectedSquareValue, {})
          : setSquareValue(
              selectedSquare,
              selectedSquareValue,
              currentState.selected.squares
            );

      console.log(newSquares);

      return {
        ...currentState,
        selected: {
          ...currentState.selected,
          originalPosition,
          squares: newSquares
        },
        error: undefined
      };
    }

    case ActionTypes.clearSelected: {
      console.log("Cleared selected!");
      return { ...currentState, selected: undefined, error: undefined };
    }

    case ActionTypes.placeSquare: {
      return currentState;
    }

    default: {
      return currentState;
    }
  }
}
