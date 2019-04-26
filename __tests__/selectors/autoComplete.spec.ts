import { getInitialReducerState } from "../../reducers";
import { getAutoCompleteScreen } from "../../reducers/autoComplete";
import { CATEGORIES, getQueryId } from "../../reducers/search";

describe("autoComplete", () => {
  it("should get auto complete screen", () => {
    const state = getInitialReducerState({
      autoComplete: {
        [getQueryId("my query", CATEGORIES)]: {
          results: ["text"],
          timeToLive: 1555834576011
        }
      },
      search: {
        query: "my query"
      }
    });
    expect(getAutoCompleteScreen(state)).toMatchSnapshot();
  });
});
