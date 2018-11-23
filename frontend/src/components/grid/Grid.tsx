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
import { Selected, Squares } from "../game/Game";
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
  selectedSquares: Selected | undefined;
  gameDispatch: React.Dispatch<GameActions>;
  isGameActive: boolean;
}

const SquaresContainer = styled.div`
  display: inline-flex;
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
        state.offset,
        props.dimensions,
        props.isGameActive
      );
    window.document.addEventListener("keydown", onKeyPress);
    return () => {
      window.document.removeEventListener("keydown", onKeyPress);
    };
  });

  const { width, height } = props.dimensions;

  return (
    <div>
      <p>
        Offset: {state.offset.x}, {state.offset.y}
      </p>
      <p>
        Current Selection: {state.hoveredSquare.x}, {state.hoveredSquare.y}
      </p>
      <p>
        Use <code>ctlr & arrow keys</code> to navigate
      </p>
      {renderGrid(
        width,
        height,
        props.squares,
        state.offset,
        state.hoveredSquare,
        props.selectedSquares,
        props.isGameActive
      )}
    </div>
  );
};

function renderGrid(
  width: number,
  height: number,
  squares: Squares,
  offset: Vector,
  hoveredSquare: Vector,
  pickedSquares: Selected | undefined,
  isGameActive: boolean
) {
  const rows: SquareProps[][] = [];

  for (let y = 0; y < height; y++) {
    const row: SquareProps[] = [];

    for (let x = 0; x < width; x++) {
      const relativePosition = createVector(x, y);
      const absolutePosition = translateVector(
        relativePosition,
        inverseVector(offset)
      );

      const isHovered = isSameVector(absolutePosition, hoveredSquare);
      const isPicked =
        !!pickedSquares &&
        !!getValueInSquares(absolutePosition, pickedSquares.squares);

      const isOriginalPosPicked =
        !!pickedSquares &&
        isSameVector(pickedSquares.originalPosition, absolutePosition);

      const value = getValueInSquares(absolutePosition, squares);

      row.push({
        value,
        isHovered,
        isPicked,
        isOriginalPosPicked,
        isGameActive
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
