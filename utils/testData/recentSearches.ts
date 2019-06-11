import _ from "lodash";

import { getMockFunction } from "./search";

export const recentSearchesTestData = ({ props: injectedProps = {}, storybook = false } = {}) => {
  const props: any = {
    navigation: {
      dangerouslyGetParent: getMockFunction({
        storybook,
        actionName: "dangerouslyGetParent",
        cb: () => props.navigation
      }),
      replace: getMockFunction({ storybook, actionName: "replace" })
    },
    searches: [
      {
        categories: ["book"],
        query: "radha",
        timestamp: 123456
      },
      { query: "radha", categories: ["book"], timestamp: 1234},
      { query: "search2", categories: ["harikatha", "movie"], timestamp: 2234},
      { query: "radha", categories: ["book", "song"], timestamp: 233333}
    ]
  };
  return _.merge(props, injectedProps);
};
