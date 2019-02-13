import * as React from "react";
import * as renderer from "react-test-renderer";

import { IMenuItemProps, MenuItem } from "../../components/MenuItem";

jest.mock("../../components/Icon", () => "Icon");

let props: IMenuItemProps;

describe("MenuItem", () => {
  beforeEach(() => {
    props = {
      active: false,
      navigateRoute: jest.fn(),
      route: {
        displayName: "Books",
        icon: {
          name: "book"
        }
      },
      to: "book",
    };
  });

  it("should render", () => {
    const tree = renderer.create(<MenuItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
