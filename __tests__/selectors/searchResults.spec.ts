import { getInitialReducerState } from "../../reducers";
import { getQueryId } from "../../reducers/search";
import { makeSelectSearchResults } from "../../reducers/searchResults";

describe("searchResults", () => {
  it("should select search results", () => {
    const queryId = getQueryId("radha", ["book", "movie"]);
    const state = getInitialReducerState(
      {
        itemsById: {
          2: {
            category: "book",
            item_id: "2",
            link: "item2-link",
            title: "item2"
          }
        },
        searchResults: {
          [queryId]: {
            nextPage: false,
            results: [{ item_id: "2", highlightedBody: "search body" }],
            suggestions: [],
            timeToLive: 2
          }
        }
      }
    );
    const props = {
      navigation: {
        getParam: () => queryId
      }
    } as any;
    // console.log(selectSearchResults(state, props));
    expect(makeSelectSearchResults()(state, props)).toMatchSnapshot();
  });
});
