import { getValue } from "../../common/getValue";
import { setSquareValue } from "../../common/squaresMethods";
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

export function reducer(currentState: State, action: Actions): State {
  switch (action.type) {
    case ActionTypes.selectSquare: {
      const selectedSquare = action.payload.vector;

      const selectedSquareValue = getValue(
        selectedSquare,
        currentState.squares
      );

      if (!selectedSquareValue) {
        return {
          ...currentState,
          selected: undefined,
          error: "Can't pick up, there's no tile there!"
        };
      }

      const newSquares = setSquareValue(
        selectedSquare,
        undefined,
        currentState.squares
      );

      return {
        ...currentState,
        selected: {
          ...currentState.selected,
          originalPosition: selectedSquare,
          value: selectedSquareValue
        },
        error: undefined,
        squares: newSquares
      };
    }

    case ActionTypes.placeSquare: {
      // there's nothing to put down
      if (!currentState.selected) {
        return { ...currentState, error: "You don't have anything to place!" };
      }

      const oldSquares = currentState.squares;
      const selectedSquare = action.payload.vector;
      const { value } = currentState.selected;

      // swapping with existing tile
      const selectedSquareValue = getValue(selectedSquare, oldSquares);
      if (selectedSquareValue) {
        const squaresAddPlaced = setSquareValue(
          selectedSquare,
          value,
          oldSquares
        );

        return {
          ...currentState,
          selected: {
            originalPosition: selectedSquare,
            value: selectedSquareValue
          },
          squares: squaresAddPlaced
        };
      } else {
        const squaresAddPlaced = setSquareValue(
          selectedSquare,
          value,
          oldSquares
        );

        return {
          ...currentState,
          selected: undefined,
          squares: squaresAddPlaced
        };
      }
    }

    default: {
      return currentState;
    }
  }
}
