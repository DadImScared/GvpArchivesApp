import { getInitialReducerState, IReducerState } from "../../reducers";
import { getSearch } from "../../reducers/search";

describe("search", () => {
  let state: IReducerState;
  const starterQuery = "query here";
  beforeEach(() => {
    state = getInitialReducerState({ search: { query: starterQuery } });
  });

  it("should get search query", () => {
    expect(getSearch(state)).toEqual(state.search);
  });
});
