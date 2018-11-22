import * as React from "react";
import styled from "styled-components";
import Grid from "../grid/Grid";
import { GameActions } from "./actions";
import { handleGameKeyPresses } from "./handleGameKeyPresses";
import { getInitialState, reducer, State } from "./reducer";

export interface Squares {
  [column: number]:
    | {
        [row: number]: string | undefined;
      }
    | undefined;
}

const GameInfoContainer = styled.div`
  border: 1px solid black;
`;

const Game: React.FunctionComponent<{}> = props => {
  const [state, dispatch] = React.useReducer<State, GameActions>(
    reducer,
    getInitialState()
  );

  React.useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) =>
      handleGameKeyPresses(event, dispatch);
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
        selectedSquares={state.selected}
        gameDispatch={dispatch}
      />
    </>
  );
};

export default Game;
