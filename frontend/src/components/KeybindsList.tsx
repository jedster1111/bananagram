import * as React from "react";
import styled from "styled-components";

const StyledKeybindList = styled.ul`
  border: dashed 1px black;
  padding: 5px;
`;

const StyledLi = styled.li`
  list-style: none;
`;

export const KeybindList: React.FC<{}> = props => (
  <StyledKeybindList>
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
      <code>Type a letter</code> to enter a letter at your hovered position
    </StyledLi>
  </StyledKeybindList>
);
