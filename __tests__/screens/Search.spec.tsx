import * as React from "react";
import * as renderer from "react-test-renderer";

import { Button } from "native-base";

import { Search } from "../../screens/Search";
import { makeTree, searchTestProps } from "../../utils/testData/search";

export type TreeMaker = (injectedProps?: any) => renderer.ReactTestRenderer;

describe("Search", () => {
  let props: any;
  let treeFactory: TreeMaker;
  beforeEach(() => {
    props = searchTestProps();
    treeFactory = makeTree(Search, props);
  });

  it("should render with results", () => {
    expect(treeFactory().toJSON()).toMatchSnapshot();
  });

  it("should navigate on suggestion press", () => {
    const tree = treeFactory();
    const instance = tree.root;
    instance.findAllByType(Button)[0].props.onPress();
    expect(props.navigation.push.mock.calls[0]).toMatchSnapshot();
  });

  it("should get results on mount", () => {
    treeFactory();
    expect(props.getSearchResults.mock.calls[0]).toMatchSnapshot();
  });

  it("should add recent search on mount", () => {
    treeFactory();
    expect(props.addRecentSearch.mock.calls[0]).toMatchSnapshot();
  });
});
