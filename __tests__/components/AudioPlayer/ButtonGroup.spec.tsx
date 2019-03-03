import * as React from "react";
import * as renderer from "react-test-renderer";

import ButtonGroup from "../../../components/AudioPlayer/ButtonGroup";

describe("ButtonGroup", () => {
  it("should render", () => {
    const onPlayPress = jest.fn();
    const tree = renderer.create(<ButtonGroup isPlaying={true} onPlayPausePressed={onPlayPress} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
