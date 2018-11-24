import * as React from "react";
import styled from "styled-components";
import { Vector } from "../../common/vectorMethods";
import Grid from "../grid/Grid";
import Hand from "../hand/Hand";
import { GameActions } from "./actions";
import { handleGameKeyPresses } from "./handleGameKeyPresses";
import { createInitialState, reducer } from "./reducer";

export interface State {
  squares: Squares;
  gridSelected: GridSelected | undefined;
  handSelected: HandSelected | undefined;
  error: string | undefined;
  handSquares: string[];
  active: ActiveTypes;
}

export type ActiveTypes = "hand" | "grid";

export interface GridSelected {
  originalPosition: Vector;
  squares: Squares;
}

export interface HandSelected {
  index: number;
}

export interface Squares {
  [column: number]: Column | undefined;
}

export interface Column {
  [row: number]: string | undefined;
}

const GameInfoContainer = styled.div`
  border: 1px solid black;
`;

const Game: React.FunctionComponent<{}> = props => {
  const [state, dispatch] = React.useReducer<State, GameActions>(
    reducer,
    createInitialState()
  );

  const isGridActive = state.active === "grid";

  React.useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) =>
      handleGameKeyPresses(event, dispatch, isGridActive);
    window.document.addEventListener("keydown", onKeyPress);
    return () => {
      window.document.removeEventListener("keydown", onKeyPress);
    };
  });

  return (
    <>
      <GameInfoContainer>
        <p>
          Use <code>Enter</code> to select and then drop tiles
        </p>
        <p>{state.error || "All going smoothly!"}</p>
      </GameInfoContainer>
      <Grid
        squares={state.squares}
        dimensions={{ width: 10, height: 10 }}
        selectedSquares={state.gridSelected}
        gameDispatch={dispatch}
        isGameActive={isGridActive}
      />
      <Hand
        handSquares={state.handSquares}
        isHandActive={!isGridActive}
        gameDispatch={dispatch}
        selectedIndex={
          state.handSelected ? state.handSelected.index : undefined
        }
      />
    </>
  );
};

export default Game;
