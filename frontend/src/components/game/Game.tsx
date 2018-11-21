import * as React from "react";
import styled from "styled-components";
import { Vector } from "../grid/actions";
import Grid from "../grid/Grid";
import { Actions, placeSquare, selectSquare } from "./actions";
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
  const [state, dispatch] = React.useReducer<State, Actions>(
    reducer,
    getInitialState()
  );

  const isSelected = !!state.selected;
  const handleSelectSquare = ({ x, y }: Vector) => dispatch(selectSquare(x, y));
  const handlePlaceSquare = ({ x, y }: Vector) => dispatch(placeSquare(x, y));

  return (
    <>
      <GameInfoContainer>
        <p>
          {isSelected
            ? `You have selected ${state.selected && state.selected.value}`
            : `Nothing selected`}
        </p>
        <p>
          Use <code>Enter</code> to select and then drop tiles
        </p>
        <p>{state.error || "All going smoothly!"}</p>
      </GameInfoContainer>
      <Grid
        squares={state.squares}
        dimensions={{ width: 10, height: 10 }}
        handleSelectSquare={handleSelectSquare}
        handlePlaceSquare={handlePlaceSquare}
        isSelected={isSelected}
        pickedSquare={state.selected && state.selected.originalPosition}
      />
    </>
  );
};

export default Game;
