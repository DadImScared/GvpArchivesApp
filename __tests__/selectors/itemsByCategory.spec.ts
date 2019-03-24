import { getInitialAudioPlayerState } from "../../reducers/audioPlayer";
import { getItemsByCategory } from "../../reducers/itemsByCategory";

describe("itemsByCategory selector", () => {
  it("should getItemsByCategory", () => {
    const state = {
      audioPlayer: getInitialAudioPlayerState(),
      itemsByCategory: {
        book: {
          results: ["123"]
        }
      },
      itemsById: {
        123: {
          category: "book",
          item_id: "123",
          link: "link",
          title: "title"
        }
      },
      loading: {}
    };
    const props = {
      navigation: {
        getParam: jest.fn(() => "book"),
        state: {
          params: {
            category: "book"
          }
        }
      } as any
    };
    const getItems = getItemsByCategory();
    const results = getItems(state, props);
    getItems(state, props);
    expect(getItems.recomputations()).toEqual(1);
    expect(results).toMatchSnapshot();
  });
});
