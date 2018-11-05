import * as React from "react";
import { useReducer } from "react";
import "../../../react-hooks.d.ts";
import { Action, addSquare, removeSquare } from "./actions";
import reducer, { getInitialState, State } from "./reducer";

/**
 * Example of new useReducer hook
 */
const ReducerExample = () => {
  const [state, dispatch] = useReducer<State, Action>(
    reducer,
    getInitialState()
  );

  return (
    <div>
      <h4>Reducer Example</h4>
      <ul>
        {state.squares.map(({ id, value }) => (
          <button key={id} onClick={() => dispatch(removeSquare(id))}>
            {value}
          </button>
        ))}
      </ul>
      <button onClick={() => dispatch(addSquare("Square!"))}>Add Square</button>
    </div>
  );
};

export default ReducerExample;
