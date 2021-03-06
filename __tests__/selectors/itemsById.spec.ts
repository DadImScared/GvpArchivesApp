import { getInitialReducerState } from "../../reducers";
import { getItemsById } from "../../reducers/itemsById";

describe("itemsById selectors", () => {
  test("getItemsById", () => {
    expect(
        getItemsById(getInitialReducerState({
          itemsById: { 123: { link: "1234", item_id: "123", category: "book", title: "here" } }
        }))
    ).toMatchSnapshot();
  });
});
