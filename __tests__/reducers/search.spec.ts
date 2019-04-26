import reducer, { CATEGORIES } from "../../reducers/search";

import { search } from "../../actions";

describe("search", () => {
  it("should update search query", () => {
    const query = "new query";
    expect(
      reducer(
        undefined,
        search.updateSearchQuery(query)
      )
    ).toEqual({ query, categories: CATEGORIES });
  });
});
