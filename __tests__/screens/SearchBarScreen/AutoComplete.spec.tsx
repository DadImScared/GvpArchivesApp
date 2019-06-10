import * as React from "react";
import * as renderer from "react-test-renderer";

import { ListItem } from "native-base";

import { getQueryId } from "../../../reducers/search";
import { AutoComplete } from "../../../screens/SearchBarScreen/AutoComplete";

describe("AutoComplete", () => {
  it("should navigate onPress list item", () => {
    const props = {
      autoComplete: {
        results: ["suggestion-1"],
        timeToLive: 1234234
      },
      categories: ["book"],
      isLoading: false,
      navigation: {
        dangerouslyGetParent: () => props.navigation,
        replace: jest.fn()
      } as any,
      query: "radha",
      queryId: getQueryId("radha", ["book"]),
      updateSearchQuery: jest.fn()
    };
    const tree = renderer.create(<AutoComplete {...props} />);
    tree.root.findByType(ListItem).props.onPress();
    expect(props.navigation.replace.mock.calls).toMatchSnapshot("navigation args");
    expect(props.updateSearchQuery.mock.calls).toMatchSnapshot("updateSearchQuery args");
  });
});
