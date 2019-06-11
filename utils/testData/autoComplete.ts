import _ from "lodash";

import { getQueryId } from "../../reducers/search";
import { getMockFunction } from "./search";

export const autoCompleteTestData = ({ props: injectedProps = {}, storybook = false } = {}) => {
  const props = {
    autoComplete: {
      results: ["suggestion-1", "suggestion-2", "suggestion-3", "suggestion-4", "suggestion-5"],
      timeToLive: 1234234
    },
    categories: ["book"],
    isLoading: false,
    navigation: {
      dangerouslyGetParent: () => props.navigation,
      replace: getMockFunction({ storybook, actionName: "replace" })
    } as any,
    query: "radha",
    queryId: getQueryId("radha", ["book"]),
    updateSearchQuery: getMockFunction({ storybook, actionName: "updateSearchQuery" })
  };
  return _.merge(props, injectedProps);
};
