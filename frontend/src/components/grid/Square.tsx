import * as React from "react";
import styled from "styled-components";

export interface SquareProps {
  value: string;
}

const SquareContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  width: 50px;
  height: 50px;
  border: solid 1px black;
  margin: 3px;
`;

const Square: React.FunctionComponent<SquareProps> = ({ value }) => (
  <SquareContainer>{value}</SquareContainer>
);

export default React.memo(Square);
