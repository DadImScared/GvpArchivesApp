import * as React from "react";
import * as renderer from "react-test-renderer";

import { action } from "@storybook/addon-actions";
import _ from "lodash";

import { getQueryId } from "../../reducers/search";

export const makeTree = (Component: any, props: any = {}) => (injectedProps: any = {}) => {
  return renderer.create(<Component {...props} {...injectedProps} />);
};

const params = {
  categories: ["book", "song"],
  query: "radha",
  queryId: getQueryId("radha", ["book", "song"])
} as any;

export const getMockFunction = ({
  storybook = false,
  actionName = "",
  cb = false
}: any) => {
  if (storybook) {
    return (...args: any) => {
      action(actionName)(...args);
      if (cb) {
        return cb(...args);
      }
    };
  }
  return cb ? jest.fn(cb) : jest.fn();
};

export const searchTestProps = ({ props = {}, storybook = false } = {}) => (_.merge({
  addRecentSearch: getMockFunction({ storybook, actionName: "addRecentSearch" }),
  getSearchResults: getMockFunction({ storybook, actionName: "getSearchResults" }),
  isLoading: false,
  navigation: {
    getParam: getMockFunction({ storybook, actionName: "getParam", cb: (param: string) => params[param] }),
    push: getMockFunction({ storybook, actionName: "push" })
  },
  results: [
    {
      category: "book",
      item_id: "item-1",
      link: "item-1-link",
      title: "item-1-title"
    }
  ],
  suggestions: ["Suggestion-1", "Suggestion-2", "Suggestion-3"],
  timeToLive: 12345
}, props));
