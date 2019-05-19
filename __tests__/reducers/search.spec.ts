import reducer, { CATEGORIES, getInitialSearchState } from "../../reducers/search";

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

  it("should select all categories", () => {
    expect(
      reducer(
        {
          categories: [],
          query: "query here"
        },
        search.selectAllCategories()
      )
    ).toMatchSnapshot();
  });

  it("should remove all categories", () => {
    expect(
      reducer(
        getInitialSearchState(),
        search.removeAllCategories()
      )
    ).toMatchSnapshot();
  });

  describe("toggleCategory", () => {
    it("should remove 'book' category", () => {
      expect(
        reducer(
          getInitialSearchState(),
          search.toggleCategory("book")
        )
      ).toMatchSnapshot();
    });

    it("should add 'book' category", () => {
      expect(
        reducer(
          {
            categories: ["song"],
            query: ""
          },
          search.toggleCategory("book")
        )
      ).toMatchSnapshot();
    });
  });
});
