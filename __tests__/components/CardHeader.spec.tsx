import * as React from "react";
import * as renderer from "react-test-renderer";

import { CardHeader } from "../../components/CardHeader";

describe("CardHeader", () => {
  it("should render", () => {
    const tree = renderer.create(<CardHeader item={{ title: "Card title here", category: "song" }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render with extraSubHeader", () => {
    const item = { title: "Card title here", category: "song" };
    const tree = renderer.create(<CardHeader item={item} extraSubHeader={"Continued text"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
