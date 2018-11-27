import * as React from "react";
import styled from "styled-components";
import { getValueInSquares } from "../../common/squaresMethods";
import {
  createVector,
  inverseVector,
  isSameVector,
  translateVector,
  Vector
} from "../../common/vectorMethods";
import { GameActions } from "../game/actions";
import { GridSelected, Squares } from "../game/Game";
import { GridActions } from "./actions";
import { handleKeyPresses } from "./handleGridKeyPresses";
import { createInitialState, reducer } from "./reducer";
import Square, { SquareProps } from "./Square";

export interface State {
  offset: Vector;
  hoveredSquare: Vector;
}

export interface Dimensions {
  width: number;
  height: number;
}

interface GridProps {
  squares: Squares;
  dimensions: Dimensions;
  selectedSquares: GridSelected | undefined;
  isSelectedSquares: boolean;
  gameDispatch: React.Dispatch<GameActions>;
  isGridActive: boolean;
  isOffsetControlsInverted: boolean;
}

const GridContainer = styled.div`
  padding: 5px;
  flex: 2;
`;

const SquaresContainer = styled.div`
  display: inline-block;
  flex-direction: column;
  border: solid 1px black;
  background-color: lightgreen;
  padding: 3px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Grid: React.FunctionComponent<GridProps> = props => {
  const [state, dispatch] = React.useReducer<State, GridActions>(
    reducer,
    createInitialState()
  );

  React.useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) =>
      handleKeyPresses(
        event,
        dispatch,
        props.gameDispatch,
        state.hoveredSquare,
        props.selectedSquares && props.selectedSquares.squares,
        props.isSelectedSquares,
        state.offset,
        props.dimensions,
        props.isGridActive,
        props.isOffsetControlsInverted
      );
    window.document.addEventListener("keydown", onKeyPress);
    return () => {
      window.document.removeEventListener("keydown", onKeyPress);
    };
  });

  const handleMouseDown = (gamePosition: Vector) => {
    console.log(gamePosition);
  };
  const handleMouseUp = (gamePosition: Vector) => {
    console.log(gamePosition);
  };

  return (
    <GridContainer>
      {renderGrid(
        props.dimensions,
        props.squares,
        state.offset,
        state.hoveredSquare,
        props.selectedSquares,
        props.isGridActive,
        handleMouseDown,
        handleMouseUp
      )}
    </GridContainer>
  );
};

function renderGrid(
  { width, height }: Dimensions,
  squares: Squares,
  offset: Vector,
  hoveredSquare: Vector,
  pickedSquares: GridSelected | undefined,
  isGameActive: boolean,
  handleMouseDown: (gamePosition: Vector) => void,
  handleMouseUp: (gamePosition: Vector) => void
) {
  const rows: SquareProps[][] = [];

  for (let y = 0; y < height; y++) {
    const row: SquareProps[] = [];

    for (let x = 0; x < width; x++) {
      const gridPosition = createVector(x, y);
      const gamePosition = translateVector(gridPosition, inverseVector(offset));

      const isHovered = isSameVector(
        gamePosition,
        translateVector(hoveredSquare, inverseVector(offset))
      );
      const isPicked =
        !!pickedSquares &&
        !!getValueInSquares(gamePosition, pickedSquares.squares);

      const isOriginalPosPicked =
        !!pickedSquares &&
        isSameVector(pickedSquares.originalPosition, gamePosition);

      const value = getValueInSquares(gamePosition, squares);

      row.push({
        value,
        isHovered,
        isPicked,
        isOriginalPosPicked,
        isGameActive,
        gamePosition,
        handleMouseDown: () => handleMouseDown(gamePosition),
        handleMouseUp: () => handleMouseUp(gamePosition)
      });
    }

    rows.push(row);
  }

  return (
    <SquaresContainer>
      {rows.map((row, indexRow) => (
        <RowContainer key={indexRow}>
          {row.map((square, indexCol) => (
            <Square {...square} key={indexCol} />
          ))}
        </RowContainer>
      ))}
    </SquaresContainer>
  );
}

export default Grid;
