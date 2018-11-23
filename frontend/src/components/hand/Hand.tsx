import * as React from "react";
import styled from "styled-components";
import { HandActions } from "./actions";
import { handleHandKeyPresses } from "./handleHandKeyPresses";
import { createInitialState, reducer } from "./reducer";

export interface State {
  hoveredSquareIndex: number;
}

interface HandProps {
  handSquares: string[];
  isHandActive: boolean;
}

const HandContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  margin: 8px 5px;
  padding: 3px;
  border: solid 1px black;
  background-color: lightgreen;
`;

const Square = styled.div<{ isHovered: boolean; isHandActive: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: ${({ isHovered, isHandActive }) =>
    isHovered && isHandActive ? "solid black 2px" : "solid grey 1px"};
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
        props.isHandActive,
        state.hoveredSquareIndex,
        handCount
      );

    window.document.addEventListener("keydown", onKeyPress);
    return () => {
      window.document.removeEventListener("keydown", onKeyPress);
    };
  });

  return (
    <HandContainer>
      {props.handSquares.map((square, index) => {
        const isHovered = index === state.hoveredSquareIndex;
        return (
          <Square isHovered={isHovered} isHandActive={props.isHandActive}>
            {square}
          </Square>
        );
      })}
    </HandContainer>
  );
};

export default Hand;
