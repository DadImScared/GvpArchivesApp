import * as React from "react";
import * as renderer from "react-test-renderer";

jest.useFakeTimers();

import { Input } from "native-base";
import { Header } from "../../../screens/SearchBarScreen/Header";

describe("Header", () => {
  let props: any;

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
      updateSearchQuery: jest.fn()
    };
  });

  it("should get suggestions on mount if query exists", () => {
    renderer.create(<Header {...props} />).toJSON();
    expect(props.getQuerySuggestions).toHaveBeenCalledTimes(1);
    expect(props.getQuerySuggestions).toBeCalledWith(props.query, props.categories);
  });

  it("should update search query on input", () => {
    const tree = renderer.create(<Header {...props} />);
    const testInstance = tree.root;
    const instanceProps = testInstance.findByType(Input).props;
    instanceProps.onChangeText("new query");
    expect(props.updateSearchQuery).toHaveBeenCalledTimes(1);
    expect(props.updateSearchQuery).toBeCalledWith("new query");
    jest.runAllTimers();
    expect(props.getQuerySuggestions).toHaveBeenCalledTimes(2);
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
