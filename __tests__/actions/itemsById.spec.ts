import { addItemsById } from "../../actions/itemsById";

describe("itemsById", () => {
  test("addItemsById", () => {
    const items = {
      id123: {
        category: "book",
        item_id: "id123",
        link: "link1",
        title: "1"
      }
    };
    expect(addItemsById(items));
  });
});
