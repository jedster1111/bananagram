import { getValueInSquares, setSquareValue } from "../../common/squaresMethods";
import { createVector } from "../../common/vectorMethods";
import { ActionTypes, GameActions } from "./actions";
import { Column, GridSelected, HandSelected, State } from "./Game";

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
    handSquares: ["A", "B", "C", "D", "E", "F"],
    active: "hand"
  };
}

function isSelectedGrid(
  selectedGrid: GridSelected | undefined
): selectedGrid is GridSelected {
  return selectedGrid !== undefined;
}

function isSelectedHand(
  selectedHand: HandSelected | undefined
): selectedHand is HandSelected {
  return selectedHand !== undefined;
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

      const newSelectedSquares =
        currentState.gridSelected === undefined
          ? setSquareValue(selectedSquareVector, selectedSquareValue, {})
          : setSquareValue(
              selectedSquareVector,
              selectedSquareValue,
              currentState.gridSelected.squares
            );

      console.log(newSelectedSquares);

      return {
        ...currentState,
        gridSelected: {
          ...currentState.gridSelected,
          originalPosition,
          squares: newSelectedSquares
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

    case ActionTypes.placeHandSquare: {
      const { gridSelected, handSelected } = currentState;
      const { index: selectedIndex } = action.payload;

      if (!isSelectedGrid && !isSelectedHand) {
        return {
          ...currentState,
          error: "You didn't have anything selected to put down"
        };
      }

      const newHandSquares = [...currentState.handSquares];
      let newSquares = { ...currentState.squares };

      if (isSelectedHand(handSelected)) {
        newHandSquares.splice(
          selectedIndex,
          0,
          newHandSquares.splice(handSelected.index, 1)[0]
        );
      }

      if (isSelectedGrid(gridSelected)) {
        const letters = Object.entries(gridSelected.squares).reduce<string[]>(
          (prev, [x, col]: [string, Column]) => {
            Object.entries(col).forEach(
              ([y, selectedValue]: [string, string]) => {
                const xInt = parseInt(x, 10);
                const yInt = parseInt(y, 10);

                if (xInt !== undefined && yInt !== undefined) {
                  const squaresValue = getValueInSquares(
                    createVector(xInt, yInt),
                    currentState.squares
                  );

                  if (squaresValue) {
                    prev.push(squaresValue);
                  }
                }
              }
            );
            return prev;
          },
          []
        );

        newHandSquares.splice(selectedIndex, 0, ...letters);

        Object.entries(gridSelected.squares).forEach(
          ([x, col]: [string, Column]) => {
            Object.entries(col).forEach(([y, selectedValue]) => {
              const xInt = parseInt(x, 10);
              const yInt = parseInt(y, 10);
              newSquares = setSquareValue(
                createVector(xInt, yInt),
                undefined,
                newSquares
              );
            });
          }
        );
      }

      return {
        ...currentState,
        handSquares: newHandSquares,
        squares: newSquares,
        gridSelected: undefined,
        handSelected: undefined
      };
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
