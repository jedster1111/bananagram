import * as React from "react";
import styled from "styled-components";

export interface SquareProps {
  value: string | undefined;
  isHovered: boolean;
  isPicked: boolean;
  isOriginalPosPicked: boolean;
}

const SquareContainer = styled.div<{
  isHovered: boolean;
  isPicked: boolean;
  isOriginalPosPicked: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  width: 50px;
  height: 50px;
  border: ${props => (props.isHovered ? "solid 2px black" : "solid 1px grey")};
  margin: 3px;
  border-color: ${props =>
    props.isPicked ? (props.isOriginalPosPicked ? "blue" : "red") : undefined};
`;

const Square: React.FunctionComponent<SquareProps> = ({
  value,
  isHovered,
  isPicked,
  isOriginalPosPicked
}) => (
  <SquareContainer
    isHovered={isHovered}
    isPicked={isPicked}
    isOriginalPosPicked={isOriginalPosPicked}
  >
    {value}
  </SquareContainer>
);

export default React.memo(Square);
