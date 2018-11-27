import * as React from "react";
import styled from "styled-components";
import { Vector } from "../../common/vectorMethods";

export interface SquareProps {
  value: string | undefined;
  isHovered: boolean;
  isPicked: boolean;
  isOriginalPosPicked: boolean;
  isGameActive: boolean;
  gamePosition: Vector;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseUp: (e: React.MouseEvent) => void;
}

const SquareContainer = styled.div<{
  isHovered: boolean;
  isPicked: boolean;
  isOriginalPosPicked: boolean;
  isGameActive: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  width: 50px;
  height: 50px;
  border: ${({ isHovered, isGameActive }) =>
    isHovered && isGameActive ? "solid 2px black" : "solid 1px grey"};
  margin: 3px;
  border-color: ${props =>
    props.isPicked ? (props.isOriginalPosPicked ? "blue" : "red") : undefined};
  background-color: white;
`;

const Square: React.FunctionComponent<SquareProps> = ({
  value,
  isHovered,
  isPicked,
  isOriginalPosPicked,
  isGameActive,
  gamePosition,
  handleMouseDown,
  handleMouseUp
}) => (
  <SquareContainer
    isHovered={isHovered}
    isPicked={isPicked}
    isOriginalPosPicked={isOriginalPosPicked}
    isGameActive={isGameActive}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
  >
    {value}
  </SquareContainer>
);

export default React.memo(Square);
