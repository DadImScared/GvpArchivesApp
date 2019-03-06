import axios from "axios";
import { addItemsByCategory, getItemsByCategory, updateItemsByCategory } from "../../actions/itemsByCategory";
import { initialAudioPlayerState } from "../../reducers/audioPlayer";

jest.mock("axios");
const payload = { category: "book", itemIds: ["1", "2"], nextPage: false};

describe("itemsByCategory", () => {
  test("addItemsByCategory", () => {
    expect(addItemsByCategory(payload)).toMatchSnapshot();
  });

  test("updateItemsbyCategory", () => {
    expect(updateItemsByCategory(payload)).toMatchSnapshot();
  });

  describe("getItemsByCategory", () => {
    it("should dispatch two times if not currently loading", async () => {
      (axios.get as any).mockImplementationOnce(() => {
        return Promise.resolve({
          data: {
            nextPage: false,
            results: []
          }
        });
      });
      const dispatch = jest.fn();
      const getState = () => ({
        audioPlayer: initialAudioPlayerState,
        itemsByCategory: {},
        itemsById: {},
        loading: {
          ITEMS_BY_CATEGORY_book: false
        },
      });
      await getItemsByCategory("book", false)(dispatch, getState, undefined);
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
