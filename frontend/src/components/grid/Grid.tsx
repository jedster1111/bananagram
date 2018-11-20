import * as React from "react";
import styled from "styled-components";
import { Squares } from "../game/Game";
import { Actions, transformOffset, translateSelector, Vector } from "./actions";
import { createVector, getInitialState, reducer, State } from "./reducer";
import Square, { SquareProps } from "./Square";

export interface Dimensions {
  width: number;
  height: number;
}

interface GridProps {
  squares: Squares;
  dimensions: Dimensions;
  isSelected: boolean;
  handleSelectSquare: (vector: Vector) => void;
  handlePlaceSquare: (vector: Vector) => void;
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
  const [state, dispatch] = React.useReducer<State, Actions>(
    reducer,
    getInitialState()
  );

  React.useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) =>
      handleKeyPresses(
        event,
        dispatch,
        props.handleSelectSquare,
        props.handlePlaceSquare,
        state.selectedSquare,
        props.isSelected
      );
    window.document.addEventListener("keydown", onKeyPress);
    return () => {
      window.document.removeEventListener("keydown", onKeyPress);
    };
  });

  const { width, height } = props.dimensions;

  return (
    <div>
      <p>Squares</p>
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
        state.selectedSquare
      )}
    </div>
  );
};

function renderGrid(
  width: number,
  height: number,
  squares: Squares,
  offset: Vector,
  selectedSquare: Vector
) {
  const rows: SquareProps[][] = [];

  const { x: selX, y: selY } = selectedSquare;

  for (let y = 0; y < height; y++) {
    const row: SquareProps[] = [];

    for (let x = 0; x < width; x++) {
      const { x: offsetX, y: offsetY } = applyOffset(x, y, offset);
      const column = squares[offsetX];
      row.push({
        value: (column && column[offsetY]) || "",
        isSelected: offsetX === selX && offsetY === selY
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

function handleKeyPresses(
  event: KeyboardEvent,
  dispatch: React.Dispatch<Actions>,
  handleSelectSquare: (vector: Vector) => void,
  handlePlaceSquare: (vector: Vector) => void,
  selectedSquare: Vector,
  isSelected: boolean
) {
  const isCtrlPressed = event.getModifierState("Control");
  switch (event.key) {
    case "ArrowUp": {
      const { x, y } = createVector(0, -1);
      dispatch(isCtrlPressed ? transformOffset(x, y) : translateSelector(x, y));
      break;
    }
    case "ArrowRight": {
      const { x, y } = createVector(1, 0);
      dispatch(isCtrlPressed ? transformOffset(x, y) : translateSelector(x, y));
      break;
    }
    case "ArrowDown": {
      const { x, y } = createVector(0, 1);
      dispatch(isCtrlPressed ? transformOffset(x, y) : translateSelector(x, y));
      break;
    }
    case "ArrowLeft": {
      const { x, y } = createVector(-1, 0);
      dispatch(isCtrlPressed ? transformOffset(x, y) : translateSelector(x, y));
      break;
    }
    case "Enter": {
      isSelected
        ? handlePlaceSquare(selectedSquare)
        : handleSelectSquare(selectedSquare);
    }
    default: {
      break;
    }
  }
}

function applyOffset(x: number, y: number, offset: Vector): Vector {
  return { x: x - offset.x, y: y - offset.y };
}

export default Grid;
