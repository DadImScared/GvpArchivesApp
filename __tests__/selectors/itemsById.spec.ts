import { getInitialAudioPlayerState } from "../../reducers/audioPlayer";
import { getItemsById } from "../../reducers/itemsById";

describe("itemsById selectors", () => {
  test("getItemsById", () => {
    expect(
        getItemsById(
          {
            audioPlayer: getInitialAudioPlayerState(),
            itemsByCategory: {},
            itemsById: { 123: { link: "1234", item_id: "123", category: "book", title: "here" } },
            loading: {}
          }
        )
    ).toMatchSnapshot();
  });
});
