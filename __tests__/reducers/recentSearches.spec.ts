import moment from "moment";

import { recentSearches } from "../../actions";
import reducer from "../../reducers/recentSearches";

describe("recentSearches", () => {
  it("should add search", () => {
    moment.now = () => 1558258058632;
    expect(
      reducer(
        [{ query: "radha", categories: ["movie"], timestamp: moment().subtract(50, "minutes").valueOf() }],
        recentSearches.addSearch("new query", ["book", "song"])
      )
    ).toMatchSnapshot();
    moment.now = () => +new Date();
  });
});
