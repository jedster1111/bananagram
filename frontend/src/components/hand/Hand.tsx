import * as React from "react";
import styled from "styled-components";
import { GameActions } from "../game/actions";
import { createMoveSelectorAction, HandActions } from "./actions";
import { handleHandKeyPresses } from "./handleHandKeyPresses";
import { createInitialState, reducer } from "./reducer";

export interface State {
  hoveredSquareIndex: number;
}

interface HandProps {
  handSquares: string[];
  isHandActive: boolean;
  gameDispatch: React.Dispatch<GameActions>;
  selectedIndex: number | undefined;
}

const HandContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  margin: 8px 5px;
  padding: 3px;
  border: solid 1px black;
  background-color: lightgreen;
`;

const Square = styled.div<{
  isHovered: boolean;
  isSelected: boolean;
  isHandActive: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: ${({ isHovered, isHandActive }) =>
    isHovered && isHandActive ? "solid black 2px" : "solid grey 1px"};
  border-color: ${({ isSelected }) => isSelected && "red"};
  margin: 3px;
  background-color: white;
`;

const Hand: React.FC<HandProps> = props => {
  const [state, dispatch] = React.useReducer<State, HandActions>(
    reducer,
    createInitialState()
  );

  const handCount = props.handSquares.length;

  React.useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) =>
      handleHandKeyPresses(
        event,
        dispatch,
        props.gameDispatch,
        props.isHandActive,
        state.hoveredSquareIndex,
        handCount
      );

    window.document.addEventListener("keydown", onKeyPress);
    return () => {
      window.document.removeEventListener("keydown", onKeyPress);
    };
  });

  React.useEffect(
    () => {
      if (
        state.hoveredSquareIndex >= props.handSquares.length ||
        state.hoveredSquareIndex < 0
      ) {
        const stepToMax =
          props.handSquares.length - 1 - state.hoveredSquareIndex;

        const step =
          state.hoveredSquareIndex < 0 ? -state.hoveredSquareIndex : stepToMax;

        console.log(
          `Hand selector is out of bounds, moving selector ${step} step/s`
        );

        dispatch(createMoveSelectorAction(step));
      }
    },
    [props.handSquares]
  );

  return (
    <HandContainer>
      {props.handSquares.length > 0 ? (
        props.handSquares.map((square, index) => {
          const isHovered = index === state.hoveredSquareIndex;
          const isSelected = index === props.selectedIndex;
          return (
            <Square
              key={index}
              isHovered={isHovered}
              isHandActive={props.isHandActive}
              isSelected={isSelected}
            >
              {square}
            </Square>
          );
        })
      ) : (
        <button>Peel</button>
      )}
    </HandContainer>
  );
};

export default Hand;
