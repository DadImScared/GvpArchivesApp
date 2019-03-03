import * as React from "react";
import * as renderer from "react-test-renderer";

import Title from "../../../components/AudioPlayer/Title";

describe("Title", () => {
  it("should render", () => {
    const getSongName = jest.fn(() => "song name here");
    const tree = renderer.create(<Title getSongName={getSongName} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
