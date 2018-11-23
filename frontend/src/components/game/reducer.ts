import { getValueInSquares, setSquareValue } from "../../common/squaresMethods";
import { ActionTypes, GameActions } from "./actions";
import { State } from "./Game";

export function createInitialState(): State {
  return {
    gridSelected: undefined,
    handSelected: undefined,
    squares: {
      2: { 5: "W" },
      3: { 1: "H", 2: "E", 3: "L", 4: "L", 5: "O" },
      4: { 3: "O", 5: "W" },
      5: { 3: "L" }
    },
    error: undefined,
    handSquares: ["B", "A", "N", "A", "N", "A"],
    active: "hand"
  };
}

export function reducer(currentState: State, action: GameActions): State {
  switch (action.type) {
    case ActionTypes.selectSquare: {
      const selectedSquareVector = action.payload.vector;

      const selectedSquareValue = getValueInSquares(
        selectedSquareVector,
        currentState.squares
      );

      if (!selectedSquareValue) {
        return {
          ...currentState,
          error: "Can't select, there's no tile there!"
        };
      }

      const originalPosition =
        currentState.gridSelected === undefined
          ? selectedSquareVector
          : currentState.gridSelected.originalPosition;

      const newSquares =
        currentState.gridSelected === undefined
          ? setSquareValue(selectedSquareVector, selectedSquareValue, {})
          : setSquareValue(
              selectedSquareVector,
              selectedSquareValue,
              currentState.gridSelected.squares
            );

      console.log(newSquares);

      return {
        ...currentState,
        gridSelected: {
          ...currentState.gridSelected,
          originalPosition,
          squares: newSquares
        },
        handSelected: undefined,
        error: undefined
      };
    }

    case ActionTypes.clearSelected: {
      console.log("Just cleared all selected squares!");
      return {
        ...currentState,
        gridSelected: undefined,
        handSelected: undefined,
        error: undefined
      };
    }

    case ActionTypes.makeActive: {
      console.log(`Making ${action.payload.makeActive} active!`);
      return { ...currentState, active: action.payload.makeActive };
    }

    case ActionTypes.placeSquare: {
      return currentState;
    }

    case ActionTypes.selectHandSquare: {
      return {
        ...currentState,
        handSelected: {
          ...currentState.handSelected,
          index: action.payload.index
        },
        gridSelected: undefined
      };
    }

    default: {
      return currentState;
    }
  }
}
