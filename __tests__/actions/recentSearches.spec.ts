import { recentSearches } from "../../actions";

describe("recentSearches", () => {
  it("should add search", () => {
    expect(recentSearches.addSearch("query", ["book"])).toMatchSnapshot();
  });
});
