import { search } from "../../actions";

describe("search", () => {
  it("should update search query", () => {
    expect(search.updateSearchQuery("new query")).toMatchSnapshot();
  });

  it("should toggle categories", () => {
    expect(search.toggleCategory("book")).toMatchSnapshot();
  });

  it("should remove all categories", () => {
    expect(search.removeAllCategories()).toMatchSnapshot();
  });

  it("should select all categories", () => {
    expect(search.selectAllCategories()).toMatchSnapshot();
  });
});
