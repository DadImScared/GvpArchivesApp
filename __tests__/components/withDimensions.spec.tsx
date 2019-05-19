import * as React from "react";
import * as renderer from "react-test-renderer";

import { createSink } from "recompose";

import { withDimensions } from "../../components/withDimensions";

describe("withDimensions", () => {
  it("should render", () => {
    const sink = createSink((props) => {
      expect(props).toMatchSnapshot();
    });

    const EnhancedSink = withDimensions("window")(sink);
    renderer.create(<EnhancedSink />);
  });
});
