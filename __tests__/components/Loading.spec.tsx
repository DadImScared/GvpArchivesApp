import * as React from "react";
import * as renderer from "react-test-renderer";

import { Loading } from "../../components/Loading";

describe("Loading", () => {
  it("should render", () => {
    const tree = renderer.create(<Loading isLoading={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
