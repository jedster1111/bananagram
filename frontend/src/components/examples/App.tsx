import * as React from "react";
import { useState } from "react";
import "../../react-hooks.d.ts";
import ReducerExample from "./ReducerExample";

export class AppClass extends React.Component<{}, { count: number }> {
  readonly state = {
    count: 0
  };

  handleClick = () => this.setState(({ count }) => ({ count: count + 1 }));

  render() {
    const { count } = this.state;
    return (
      <div>
        You clicked {count} times!
        <button onClick={this.handleClick}>Click me!</button>
      </div>
    );
  }
}

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      You clicked {count} times!
      <button onClick={() => setCount(count + 1)}>Click me!</button>
      <ReducerExample />
    </div>
  );
};

export default App;
