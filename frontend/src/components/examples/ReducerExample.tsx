import * as React from "react";
import { useReducer } from "react";
import uuid from "uuid/v4";
import "../../react-hooks.d.ts";

const ReducerExample = () => {
  const [state, dispatch] = useReducer<State, Action>(
    reducer,
    getInitialState()
  );

  return (
    <div>
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

enum ActionTypes {
  AddSquare = "AddSquare",
  RemoveSquare = "RemoveSquare"
}

interface Square {
  id: string;
  value: string;
}

type Action =
  | {
      type: ActionTypes.AddSquare;
      payload: { value: string };
    }
  | {
      type: ActionTypes.RemoveSquare;
      payload: { id: string };
    };

interface State {
  squares: Square[];
}

function addSquare(value: string): Action {
  return {
    type: ActionTypes.AddSquare,
    payload: { value }
  };
}

function removeSquare(id: string): Action {
  return {
    type: ActionTypes.RemoveSquare,
    payload: { id }
  };
}

function reducer(currentState: State, action: Action): State {
  switch (action.type) {
    case "AddSquare": {
      return {
        ...currentState,
        squares: [
          { id: uuid(), value: action.payload.value },
          ...currentState.squares
        ]
      };
    }
    case "RemoveSquare": {
      return {
        ...currentState,
        squares: currentState.squares.filter(
          square => square.id !== action.payload.id
        )
      };
    }
    default:
      return currentState;
  }
}

function getInitialState(): State {
  return {
    squares: [{ id: uuid(), value: "first" }]
  };
}

export default ReducerExample;
