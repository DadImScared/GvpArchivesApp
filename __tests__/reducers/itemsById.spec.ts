import actions from "../../actions";
import reducer from "../../reducers/itemsById";

describe("itemsById reducer", () => {
  it("should have initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual({});
  });

  it("should add items", () => {
    const items = {
      1234: {
        category: "book",
        item_id: "1234",
        link: "link1",
        title: "title1"
      }
    };
    expect(reducer(undefined, actions.itemsById.addItemsById(items))).toEqual(items);
  });
});
