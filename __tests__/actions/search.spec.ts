import { search } from "../../actions";

describe("search", () => {
  it("should update search query", () => {
    expect(search.updateSearchQuery("new query")).toMatchSnapshot();
  });
});
