import * as React from "react";
import styled from "styled-components";

export interface SquareProps {
  value: string;
  isSelected: boolean;
}

const SquareContainer = styled.div<{ isSelected: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  width: 50px;
  height: 50px;
  border: ${props => (props.isSelected ? "solid 2px black" : "solid 1px grey")};
  margin: 3px;
`;

const Square: React.FunctionComponent<SquareProps> = ({
  value,
  isSelected
}) => <SquareContainer isSelected={isSelected}>{value}</SquareContainer>;

export default React.memo(Square);
