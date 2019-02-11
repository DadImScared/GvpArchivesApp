import * as React from "react";
import * as renderer from "react-test-renderer";

import { AudioResult, IAudioResultProps } from "../../components/AudioResult";

let props: IAudioResultProps;

describe("AudioResult", () => {
  beforeEach(() => {
    props = {
      item: {
        category: "song",
        item_id: "1",
        link: "link1",
        title: "title1",
      }
    };
  });

  it("should render", () => {
    const tree = renderer.create(<AudioResult {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
