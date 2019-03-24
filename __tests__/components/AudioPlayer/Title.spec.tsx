import * as React from "react";
import * as renderer from "react-test-renderer";

import { Title } from "../../../components/AudioPlayer/Title";

describe("Title", () => {
  it("should render", () => {
    const tree = renderer.create(<Title songName={"song name here"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
