import * as React from "react";

import { ListItem } from "native-base";

import { AutoComplete } from "../../../screens/SearchBarScreen/AutoComplete";
import { autoCompleteTestData } from "../../../utils/testData/autoComplete";
import { makeTree } from "../../../utils/testData/search";

describe("AutoComplete", () => {
  it("should navigate onPress list item", () => {
    const props = autoCompleteTestData();
    const tree = makeTree(AutoComplete, props)();
    tree.root.findAllByType(ListItem)[0].props.onPress();
    expect(props.navigation.replace.mock.calls[0]).toMatchSnapshot("navigation args");
    expect((props.updateSearchQuery as any).mock.calls[0]).toMatchSnapshot("updateSearchQuery args");
  });
});
