import * as React from "react";
import * as renderer from "react-test-renderer";

import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("should render", () => {
    const tree = renderer.create(<MyComponent />);
    expect(tree).toMatchSnapshot();
  });

});
