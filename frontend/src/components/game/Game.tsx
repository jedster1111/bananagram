import * as React from "react";
import styled from "styled-components";
import { Vector } from "../../common/vectorMethods";
import Grid from "../grid/Grid";
import Hand from "../hand/Hand";
import { createSetIsOffsetAction, GameActions } from "./actions";
import { handleGameKeyPresses } from "./handleGameKeyPresses";
import { createInitialState, reducer } from "./reducer";

export interface State {
  squares: Squares;
  gridSelected: GridSelected | undefined;
  handSelected: HandSelected | undefined;
  error: string | undefined;
  handSquares: string[];
  active: ActiveTypes;
  isOffsetControlsInverted: boolean;
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
  flex: 1;
  min-width: 370px;
  padding: 5px 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`;

const GameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  user-select: none;
`;

const StyledLi = styled.li`
  list-style: none;
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
    <GameContainer>
      <GameInfoContainer>
        <Hand
          handSquares={state.handSquares}
          isHandActive={!isGridActive}
          gameDispatch={dispatch}
          selectedIndex={
            state.handSelected ? state.handSelected.index : undefined
          }
          isSelectedGrid={!!state.handSelected}
        />
        <ul>
          <StyledLi>
            <code>Enter</code> to select and place tiles
          </StyledLi>
          <StyledLi>
            <code>Shift + Enter</code> to select multiple tiles
          </StyledLi>
          <StyledLi>
            <code>Ctrl + Arrow Keys</code> to move camera
          </StyledLi>
          <StyledLi>
            <code>Delete or Backspace</code> to put tiles back into hand
          </StyledLi>
          <StyledLi>
            <code>Spacebar</code> to toggle between the grid and your hand
          </StyledLi>
          <StyledLi>
            <code>Escape</code> to deselect all selected squares
          </StyledLi>
          <StyledLi>
            <code>Type a letter</code> to enter a letter at your hovered
            position
          </StyledLi>
        </ul>
        <input
          id="inverted-offset-controls"
          type="checkbox"
          checked={state.isOffsetControlsInverted}
          onChange={e => dispatch(createSetIsOffsetAction(e.target.checked))}
        />
        <label htmlFor="inverted-offset-controls">
          Inverted Offset Controls
        </label>
        <p>{state.error || "All going smoothly!"}</p>
      </GameInfoContainer>
      <Grid
        squares={state.squares}
        dimensions={{ width: 10, height: 10 }}
        selectedSquares={state.gridSelected}
        isSelectedSquares={!!state.handSelected}
        gameDispatch={dispatch}
        isGridActive={isGridActive}
        isOffsetControlsInverted={state.isOffsetControlsInverted}
      />
    </GameContainer>
  );
};

export default Game;
