import * as React from "react";
import * as renderer from "react-test-renderer";

import { IMenuItemProps, MenuItem } from "../../components/MenuItem";

let props: IMenuItemProps;

describe("MenuItem", () => {
  beforeEach(() => {
    props = {
      active: false,
      display: "Books",
      navigateRoute: jest.fn(),
      to: "book",
    };
  });

  it("should render", () => {
    const tree = renderer.create(<MenuItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
