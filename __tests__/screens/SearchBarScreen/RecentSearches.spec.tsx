import * as React from "react";
import * as renderer from "react-test-renderer";

import { ListItem } from "native-base";

import { RecentSearches } from "../../../screens/SearchBarScreen/RecentSearches";

describe("RecentSearches", () => {
  let props: any;

  beforeEach(() => {
    props = {
      navigation: {
        dangerouslyGetParent: jest.fn(() => props.navigation),
        replace: jest.fn()
      },
      searches: [{
        categories: ["book"],
        query: "radha",
        timestamp: 123456
      }]
    };
  });

  it("should navigate onPress list item", () => {
    const tree = renderer.create(<RecentSearches {...props} />);
    const instance = tree.root;
    instance.findAllByType(ListItem)[0].props.onPress();
    expect(props.navigation.dangerouslyGetParent).toHaveBeenCalledTimes(3);
    expect(props.navigation.replace.mock.calls[0]).toMatchSnapshot();
  });
});
