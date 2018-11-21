import * as React from "react";
import styled from "styled-components";
import { getValue } from "../../common/squaresMethods";
import {
  createVector,
  inverse,
  isSameVector,
  translate
} from "../../common/vectorMethods";
import { GameActions } from "../game/actions";
import { Squares } from "../game/Game";
import { GridActions, Vector } from "./actions";
import { handleKeyPresses } from "./handleKeyPresses";
import { getInitialState, reducer, State } from "./reducer";
import Square, { SquareProps } from "./Square";

export interface Dimensions {
  width: number;
  height: number;
}

interface GridProps {
  squares: Squares;
  dimensions: Dimensions;
  isSelected: boolean;
  pickedSquare: Vector | undefined;
  gameDispatch: React.Dispatch<GameActions>;
}

const SquaresContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Grid: React.FunctionComponent<GridProps> = props => {
  const [state, dispatch] = React.useReducer<State, GridActions>(
    reducer,
    getInitialState()
  );

  React.useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) =>
      handleKeyPresses(
        event,
        dispatch,
        props.gameDispatch,
        state.selectedSquare,
        state.offset,
        props.dimensions
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
        Current Selection: {state.selectedSquare.x}, {state.selectedSquare.y}
      </p>
      <p>
        Use <code>ctlr & arrow keys</code> to navigate
      </p>
      {renderGrid(
        width,
        height,
        props.squares,
        state.offset,
        state.selectedSquare,
        props.pickedSquare
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
  pickedSquare: Vector | undefined
) {
  const rows: SquareProps[][] = [];

  for (let y = 0; y < height; y++) {
    const row: SquareProps[] = [];

    for (let x = 0; x < width; x++) {
      const relativePosition = createVector(x, y);
      const absolutePosition = translate(relativePosition, inverse(offset));

      const isHovered = isSameVector(absolutePosition, hoveredSquare);
      const isPicked =
        !!pickedSquare && isSameVector(absolutePosition, pickedSquare);

      row.push({
        value: getValue(absolutePosition, squares),
        isHovered,
        isPicked
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
