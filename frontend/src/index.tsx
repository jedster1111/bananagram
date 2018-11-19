import React from "react";
import ReactDOM from "react-dom";
import Grid, { Squares } from "./components/grid/Grid";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const squares: Squares = {
  2: { 5: "W" },
  3: { 1: "H", 2: "E", 3: "L", 4: "L", 5: "O" },
  4: { 3: "O", 5: "W" },
  5: { 3: "L" }
};
// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(
  <Grid squares={squares} dimensions={{ width: 10, height: 10 }} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
