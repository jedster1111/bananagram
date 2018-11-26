import { getValueInSquares, setSquareValue } from "../../common/squaresMethods";
import {
  createVector,
  inverseVector,
  isSameVector,
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
    active: "hand",
    isOffsetControlsInverted: false
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
    case ActionTypes.selectGridSquare: {
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

    case ActionTypes.deselectGridSquare: {
      const { gridSelected } = currentState;
      const { vector } = action.payload;

      if (gridSelected === undefined) {
        return {
          ...currentState,
          error: "There are no selected squares to remove!"
        };
      }

      if (isSameVector(gridSelected.originalPosition, vector)) {
        return {
          ...currentState,
          error: "Can't unselect the original selection square"
        };
      }

      let newSelectedSquares = { ...gridSelected.squares };

      newSelectedSquares = setSquareValue(
        vector,
        undefined,
        newSelectedSquares
      );

      return {
        ...currentState,
        gridSelected: { ...gridSelected, squares: newSelectedSquares },
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
      let squaresThatHaveBeenChanged = {};

      if (isHandSelected(handSelected)) {
        const existingValue = getValueInSquares(vector, currentState.squares);

        // remove the square that was just placed from your hand
        newHandSquares.splice(handSelected.index, 1);

        if (existingValue !== undefined) {
          newHandSquares.splice(0, 0, existingValue);
        }

        // Place the selected square at the hovered position
        newGridSquares = setSquareValue(
          vector,
          handSquares[handSelected.index],
          currentState.squares
        );
      }

      if (isGridSelected(gridSelected)) {
        // the vector to translate from the orignal position to the hovered position
        const translationVector = translateVector(
          vector,
          inverseVector(gridSelected.originalPosition)
        );

        // Looping through the selected squares
        Object.entries(gridSelected.squares).forEach(
          ([x, col]: [string, Column | undefined]) => {
            const xInt = parseInt(x, 10);

            if (col !== undefined) {
              // Looping through the column at position x
              Object.entries(col).forEach(
                ([y, selectedValue]: [string, string | undefined]) => {
                  if (selectedValue !== undefined) {
                    const yInt = parseInt(y, 10);

                    // the position of the current loop's selected square
                    const positionVector = createVector(xInt, yInt);

                    // apply the translationVector to get the position this square will be moved to
                    const newPositionVector = translateVector(
                      positionVector,
                      translationVector
                    );

                    // get the value of the square that we're trying to move into
                    const existingValue = getValueInSquares(
                      newPositionVector,
                      currentState.squares
                    );

                    // add the square that we're about to change to our list, so we can avoid re-editing it later
                    squaresThatHaveBeenChanged = setSquareValue(
                      newPositionVector,
                      selectedValue,
                      squaresThatHaveBeenChanged
                    );

                    // set the new square's value
                    newGridSquares = setSquareValue(
                      newPositionVector,
                      selectedValue,
                      newGridSquares
                    );

                    const squareHasBeenEdited = !!getValueInSquares(
                      positionVector,
                      squaresThatHaveBeenChanged
                    );
                    const isNewPositionInSelected = !!getValueInSquares(
                      newPositionVector,
                      gridSelected.squares
                    );

                    // If the original position has been edited in a previous loop,
                    // don't clear it
                    if (!squareHasBeenEdited) {
                      // if there's already a tile and the new position isn't going to be edited, then move it into your hand
                      if (
                        existingValue !== undefined &&
                        !isNewPositionInSelected
                      ) {
                        newHandSquares.splice(0, 0, existingValue);
                      }
                      // remove the square from it's old position
                      newGridSquares = setSquareValue(
                        positionVector,
                        undefined,
                        newGridSquares
                      );
                    }
                  }
                }
              );
            }
          }
        );
      }

      return {
        ...currentState,
        squares: newGridSquares,
        handSquares: newHandSquares,
        gridSelected: undefined,
        handSelected: undefined,
        error: undefined
      };
    }

    case ActionTypes.placeGridSquareWithKeyboard: {
      const { key, vector } = action.payload;

      const upperCaseKey = key.toUpperCase();

      const indexOfHandSquare = currentState.handSquares.findIndex(
        square => square === upperCaseKey
      );

      if (indexOfHandSquare === -1) {
        return {
          ...currentState,
          error: `You don't have a ${upperCaseKey} in your hand!`
        };
      }

      const existingValue = getValueInSquares(vector, currentState.squares);

      const newGridSquares = setSquareValue(
        vector,
        upperCaseKey,
        currentState.squares
      );

      const newHandSquares = removeElementAtIndex(
        indexOfHandSquare,
        currentState.handSquares
      );

      if (existingValue !== undefined) {
        // newHandSquares.push(existingValue);
        newHandSquares.splice(0, 0, existingValue);
      }

      return {
        ...currentState,
        squares: newGridSquares,
        handSquares: newHandSquares,
        error: undefined
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
          (prev, [x, col]: [string, Column | undefined]) => {
            const xInt = parseInt(x, 10);

            if (col !== undefined) {
              Object.entries(col).forEach(
                ([y, selectedValue]: [string, string | undefined]) => {
                  if (selectedValue !== undefined) {
                    const yInt = parseInt(y, 10);

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
            }
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
        handSelected: undefined,
        error: undefined
      };
    }

    case ActionTypes.sendHoveredToHand: {
      const { vector } = action.payload;
      const { squares, handSquares } = currentState;

      const hoveredValue = getValueInSquares(vector, squares);

      if (hoveredValue === undefined) {
        return { ...currentState, error: "You're not hovered over anything?" };
      }

      const newSquares = setSquareValue(vector, undefined, squares);

      const newHandSquares = [hoveredValue, ...handSquares];

      return {
        ...currentState,
        squares: newSquares,
        handSquares: newHandSquares,
        error: undefined
      };
    }

    case ActionTypes.selectHandSquare: {
      return {
        ...currentState,
        handSelected: {
          ...currentState.handSelected,
          index: action.payload.index
        },
        gridSelected: undefined,
        error: undefined
      };
    }

    case ActionTypes.setIsOffsetInverted: {
      return {
        ...currentState,
        isOffsetControlsInverted: action.payload.isOffsetControlsInverted
      };
    }

    default: {
      return currentState;
    }
  }
}

function removeElementAtIndex(index: number, array: string[]) {
  const newArray = [...array];
  newArray.splice(index, 1);
  return newArray;
}
