import * as React from "react";
import * as renderer from "react-test-renderer";

import { Input } from "native-base";

import { Header } from "../../../screens/SearchBarScreen/Header";
import { makeTree } from "../../../utils/testData/search";
import { TreeMaker } from "../Search.spec";

jest.useFakeTimers();

describe("Header", () => {
  let props: any;
  let treeFactory: TreeMaker;

  beforeEach(() => {
    const navActions = {
      addListener: jest.fn(),
      dangerouslyGetParent: () => navActions,
      replace: jest.fn()
    };
    props = {
      categories: ["song", "book"],
      getQuerySuggestions: jest.fn(),
      navigation: navActions,
      query: "radha",
      selectAllCategories: jest.fn(),
      updateSearchQuery: jest.fn(),
    };
    treeFactory = makeTree(Header, props);
  });

  it("should reset query and categories on mount", () => {
    treeFactory();
    expect(props.updateSearchQuery).toHaveBeenCalledWith("");
    expect(props.getQuerySuggestions).toHaveBeenCalledTimes(0);
    expect(props.selectAllCategories).toHaveBeenCalled();
  });

  it("should update search query on input", () => {
    const tree = renderer.create(<Header {...props} />);
    const testInstance = tree.root;
    const instanceProps = testInstance.findByType(Input).props;
    instanceProps.onChangeText("new query");
    expect(props.updateSearchQuery).toBeCalledWith("new query");
    jest.runAllTimers();
    expect(props.getQuerySuggestions).toHaveBeenCalledWith("new query", props.categories);
  });

  it("should navigate on submit editing", () => {
    const tree = renderer.create(<Header {...props} />);
    const testInstance = tree.root;
    const instanceProps = testInstance.findByType(Input).props;
    instanceProps.onSubmitEditing();
    expect(props.navigation.replace.mock.calls[0]).toMatchSnapshot();
  });
});
