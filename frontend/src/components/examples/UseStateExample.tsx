import * as React from "react";
import { useState } from "react";
import "../../react-hooks.d.ts";

/**
 * Class example of a stateful component
 */
export class UseStateClass extends React.Component<{}, { count: number }> {
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

/**
 * Hook example of making a stateful function Component
 */
const UseStateFunc = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <h4>useState example</h4>
      </p>
      <p>You clicked {count} times!</p>
      <button onClick={() => setCount(count + 1)}>Click me!</button>
    </div>
  );
};

export default UseStateFunc;
