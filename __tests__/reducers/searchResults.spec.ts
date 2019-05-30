import moment from "moment";

import { searchResults } from "../../actions";
import { getQueryId } from "../../reducers/search";
import reducer from "../../reducers/searchResults";

describe("searchResults reducer", () => {
  it("should add search", () => {
    moment.now = () => 1558593861568;
    expect(
      reducer(
        {},
        searchResults.addSearch(
          getQueryId("radha", ["book", "movie"]),
          [{ item_id: "1", highlightedBody: "search body" }],
          [],
          "/nextpage"
        )
      )
    ).toMatchSnapshot();
    moment.now = () => +new Date();
  });

  it("should update search", () => {
    const queryId = getQueryId("radha", ["book", "movie"]);
    expect(
      reducer(
        {
          [queryId]: {
            nextPage: false,
            results: [{ item_id: "2", highlightedBody: "search body" }],
            suggestions: ["suggestion"],
            timeToLive: 1558593861568
          }
        },
        searchResults.updateSearch(
          queryId,
          [
            { item_id: "1", highlightedBody: "search body" },
            { item_id: "2", highlightedBody: "search body" }
          ],
          [],
          "/nextpage2"
        )
      )
    ).toMatchSnapshot();
  });
});
