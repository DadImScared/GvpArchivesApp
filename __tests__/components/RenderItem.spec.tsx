import * as React from "react";
import * as renderer from "react-test-renderer";

import { IRenderItemProps, RenderItem } from "../../components/RenderItem";

let props: IRenderItemProps;

describe("RenderItem", () => {
  beforeEach(() => {
    props = {
      item: {
        category: "song",
        item_id: "1",
        link: "itemlink",
        title: "itemtitle"
      }
    };
  });

  it("should render default component", () => {
    props = {
      item: {
        ...props.item,
        category: "harmonistmonthly"
      }
    };
    const tree = renderer.create(<RenderItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render custom component", () => {
    const tree = renderer.create(<RenderItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
