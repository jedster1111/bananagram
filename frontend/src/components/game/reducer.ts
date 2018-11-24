import { getValueInSquares, setSquareValue } from "../../common/squaresMethods";
import {
  createVector,
  inverseVector,
  translateVector
} from "../../common/vectorMethods";
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

function isGridSelected(
  selectedGrid: GridSelected | undefined
): selectedGrid is GridSelected {
  return selectedGrid !== undefined;
}

function isHandSelected(
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

    case ActionTypes.placeGridSquare: {
      const { gridSelected, handSelected, handSquares } = currentState;
      const { vector } = action.payload;

      if (!isGridSelected(gridSelected) && !isHandSelected(handSelected)) {
        console.log("Nothing was selected D:");
        return {
          ...currentState,
          error: "You didn't have anything selected to put down"
        };
      }

      const newHandSquares = [...currentState.handSquares];
      let newGridSquares = { ...currentState.squares };

      if (isHandSelected(handSelected)) {
        const existingValue = getValueInSquares(vector, newGridSquares);

        if (existingValue !== undefined) {
          newHandSquares.push(existingValue);
        }

        // Place the selected square at the hovered position
        newGridSquares = setSquareValue(
          vector,
          handSquares[handSelected.index],
          newGridSquares
        );

        // remove the square that was just placed from your hand
        newHandSquares.splice(handSelected.index, 1);
      }

      if (isGridSelected(gridSelected)) {
        // the vector to translate from the orignal position to the hovered position
        const translationVector = translateVector(
          vector,
          inverseVector(gridSelected.originalPosition)
        );

        // Looping through the selected squares
        Object.entries(gridSelected.squares).forEach(
          ([x, col]: [string, Column]) => {
            const xInt = parseInt(x, 10);

            // Looping through the column at position x
            Object.entries(col).forEach(
              ([y, selectedValue]: [string, string]) => {
                const yInt = parseInt(y, 10);

                // the position of the current loop's selected square
                const positionVector = createVector(xInt, yInt);

                // apply the translationVector to get this square's new position
                const newPositionVector = translateVector(
                  positionVector,
                  translationVector
                );

                // get the value of the square that we're trying to move into
                const existingValue = getValueInSquares(
                  newPositionVector,
                  newGridSquares
                );

                // if there's already a tile, then move it into your hand
                if (existingValue !== undefined) {
                  newHandSquares.push(existingValue);
                }

                // set the new square's value
                newGridSquares = setSquareValue(
                  newPositionVector,
                  selectedValue,
                  newGridSquares
                );

                // remove the square from it's old position
                newGridSquares = setSquareValue(
                  positionVector,
                  undefined,
                  newGridSquares
                );
              }
            );
          }
        );
      }

      return {
        ...currentState,
        squares: newGridSquares,
        handSquares: newHandSquares,
        gridSelected: undefined,
        handSelected: undefined
      };
    }

    case ActionTypes.placeHandSquare: {
      const { gridSelected, handSelected } = currentState;
      const { index: selectedIndex } = action.payload;

      if (!isGridSelected(gridSelected) && !isHandSelected(handSelected)) {
        console.log("Nothing was selected D:");
        return {
          ...currentState,
          error: "You didn't have anything selected to put down"
        };
      }

      const newHandSquares = [...currentState.handSquares];
      let newGridSquares = { ...currentState.squares };

      if (isHandSelected(handSelected)) {
        newHandSquares.splice(
          selectedIndex,
          0,
          newHandSquares.splice(handSelected.index, 1)[0]
        );
      }

      if (isGridSelected(gridSelected)) {
        const letters = Object.entries(gridSelected.squares).reduce<string[]>(
          (prev, [x, col]: [string, Column]) => {
            const xInt = parseInt(x, 10);

            Object.entries(col).forEach(
              ([y, selectedValue]: [string, string]) => {
                const yInt = parseInt(y, 10);

                if (xInt !== undefined && yInt !== undefined) {
                  const selectedVector = createVector(xInt, yInt);

                  const squaresValue = getValueInSquares(
                    selectedVector,
                    currentState.squares
                  );

                  if (squaresValue) {
                    prev.push(squaresValue);

                    newGridSquares = setSquareValue(
                      selectedVector,
                      undefined,
                      newGridSquares
                    );
                  }
                }
              }
            );
            return prev;
          },
          []
        );

        newHandSquares.splice(selectedIndex, 0, ...letters);
      }

      return {
        ...currentState,
        handSquares: newHandSquares,
        squares: newGridSquares,
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

// function getSquaresWithSelectedSetToUndefined(
//   gridSelected: GridSelected,
//   newGridSquares: { [x: number]: Column | undefined }
// ) {
//   Object.entries(gridSelected.squares).forEach(([x, col]: [string, Column]) => {
//     Object.entries(col).forEach(([y, selectedValue]) => {
//       const xInt = parseInt(x, 10);
//       const yInt = parseInt(y, 10);
//       newGridSquares = setSquareValue(
//         createVector(xInt, yInt),
//         undefined,
//         newGridSquares
//       );
//     });
//   });
//   return newGridSquares;
// }
