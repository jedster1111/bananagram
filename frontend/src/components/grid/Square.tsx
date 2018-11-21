import * as React from "react";
import styled from "styled-components";

export interface SquareProps {
  value: string | undefined;
  isHovered: boolean;
  isPicked: boolean;
}

const SquareContainer = styled.div<{ isSelected: boolean; isPicked: boolean }>`
  transition: border-color 0.5s;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  width: 50px;
  height: 50px;
  border: ${props => (props.isSelected ? "solid 2px black" : "solid 1px grey")};
  margin: 3px;
  border-color: ${props => (props.isPicked ? "red" : "grey")};
  // opacity: ${props => (props.isPicked ? "0.3" : "1")};
`;

const Square: React.FunctionComponent<SquareProps> = ({
  value,
  isHovered,
  isPicked
}) => (
  <SquareContainer isSelected={isHovered} isPicked={isPicked}>
    {value}
  </SquareContainer>
);

export default React.memo(Square);
