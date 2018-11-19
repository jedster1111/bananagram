import * as React from "react";
import styled from "styled-components";
import { Actions, transformOffset, Vector } from "./actions";
import { getInitialState, reducer, State } from "./reducer";
import Square, { SquareProps } from "./Square";

export interface Squares {
  [column: number]: {
    [row: number]: string | undefined;
  };
}

export interface Dimensions {
  width: number;
  height: number;
}

interface GridProps {
  squares: Squares;
  dimensions: Dimensions;
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
      handleNavigation(event, dispatch);
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
        Use <code>ctlr & arrow keys</code> to navigate
      </p>
      {renderGrid(width, height, props.squares, state.offset)}
    </div>
  );
};

function renderGrid(
  width: number,
  height: number,
  squares: Squares,
  offset: Vector
) {
  const rows: SquareProps[][] = [];

  for (let y = 0; y < height; y++) {
    const row: SquareProps[] = [];

    for (let x = 0; x < width; x++) {
      const { x: offsetX, y: offsetY } = applyOffset(x, y, offset);
      const column = squares[offsetX];
      row.push({
        value: (column && column[offsetY]) || ""
      });
    }

    rows.push(row);
  }

  return (
    <SquaresContainer>
      {rows.map((row, indexRow) => (
        <RowContainer key={indexRow}>
          {row.map((square, indexCol) => (
            <Square value={square.value} key={indexCol} />
          ))}
        </RowContainer>
      ))}
    </SquaresContainer>
  );
}

function handleNavigation(
  event: KeyboardEvent,
  dispatch: React.Dispatch<Actions>
) {
  if (event.getModifierState("Control")) {
    switch (event.key) {
      case "ArrowUp": {
        dispatch(transformOffset(0, 1));
        break;
      }
      case "ArrowRight": {
        dispatch(transformOffset(1, 0));
        break;
      }
      case "ArrowDown": {
        dispatch(transformOffset(0, -1));
        break;
      }
      case "ArrowLeft": {
        dispatch(transformOffset(-1, 0));
        break;
      }
      default: {
        break;
      }
    }
  }
}

function applyOffset(x: number, y: number, offset: Vector): Vector {
  return { x: x - offset.x, y: y + offset.y };
}

export default Grid;
