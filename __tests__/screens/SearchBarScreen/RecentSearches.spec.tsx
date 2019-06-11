import * as React from "react";

import { ListItem } from "native-base";

import { RecentSearches } from "../../../screens/SearchBarScreen/RecentSearches";
import { recentSearchesTestData } from "../../../utils/testData/recentSearches";
import { makeTree } from "../../../utils/testData/search";
import { TreeMaker } from "../Search.spec";

describe("RecentSearches", () => {
  let props: any;
  let treeFactory: TreeMaker;

  beforeEach(() => {
    props = recentSearchesTestData();
    treeFactory = makeTree(RecentSearches, props);
  });

  it("should navigate onPress list item", () => {
    const tree = treeFactory();
    const instance = tree.root;
    instance.findAllByType(ListItem)[0].props.onPress();
    expect(props.navigation.dangerouslyGetParent).toHaveBeenCalledTimes(3);
    expect(props.navigation.replace.mock.calls[0]).toMatchSnapshot();
  });
});
