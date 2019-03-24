import moment from "moment";
import { itemsByCategory } from "../../actions";
import reducer from "../../reducers/itemsByCategory";

describe("itemsByCategory reducer", () => {
  beforeEach(() => {
    moment.now = () => 1531185017608;
  });

  afterEach(() => {
    moment.now = Date.now;
  });

  it("should have initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual({});
  });

  it("should add items by category", () => {
    expect(
        reducer(
            undefined,
            itemsByCategory.addItemsByCategory({ category: "book", itemIds: ["1", "2"], nextPage: false})
        )
    ).toMatchSnapshot();
  });

  it("should update items", () => {
    expect(
        reducer(
            {
              book: {
                nextPage: "nextPage",
                results: ["1234", "12"],
                timeToLive: 12345
              }
            },
            itemsByCategory.updateItemsByCategory({
              category: "book", itemIds: ["1", "2", "1234"], nextPage: false
            })
        )
    ).toMatchSnapshot();
  });
});
