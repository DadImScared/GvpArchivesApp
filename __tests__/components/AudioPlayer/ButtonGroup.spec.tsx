import * as React from "react";
import * as renderer from "react-test-renderer";

import { ButtonGroup } from "../../../components/AudioPlayer/ButtonGroup";

describe("ButtonGroup", () => {
  it("should render", () => {
    const tree = renderer.create(<ButtonGroup playing={true} togglePlaying={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
