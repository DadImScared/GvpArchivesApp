import * as React from "react";
import * as renderer from "react-test-renderer";

import { NavigationScreenProps, StackActions } from "react-navigation";

import { SideBar } from "../../components/SideBar";

let props: NavigationScreenProps;

describe("SideBar", () => {
  beforeEach(() => {
    props = {
      navigation: {
        closeDrawer: jest.fn(),
        dispatch: jest.fn()
      } as any
    };
  });

  it("should render", () => {
    const tree = renderer.create(<SideBar {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should navigateRoute", () => {
    const tree = renderer.create(<SideBar {...props} />);
    const instance = tree.root;
    instance.instance.navigateRoute("book");
    expect(props.navigation.dispatch).toHaveBeenCalledWith(StackActions.push({
      params: {
        category: "book"
      },
      routeName: "ItemsByCategory"
    }));
    expect(props.navigation.closeDrawer).toBeCalled();
  });
});
