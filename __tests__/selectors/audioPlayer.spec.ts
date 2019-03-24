import {
  getAudioPlayerData,
  getButtonGroupData,
  getInitialAudioPlayerState,
  getSeekerData,
  getTitleData
} from "../../reducers/audioPlayer";

const state = {
  audioPlayer: {
    ...getInitialAudioPlayerState(),
    currentSongName: "song name",
    currentSongUrl: "song url",
    duration: 450000,
    position: 2000
  },
  itemsByCategory: {},
  itemsById: {},
  loading: {}
};

describe("audioPlayer selectors", () => {
  it("should getAudioPlayerData", () => {
    const results = getAudioPlayerData(state);
    expect(results).toMatchSnapshot();
  });

  it("should getButtonGroupData", () => {
    const results = getButtonGroupData(state);
    expect(results).toMatchSnapshot();
  });

  it("should getSeekerData", () => {
    const results = getSeekerData(state);
    expect(results).toMatchSnapshot();
  });

  it("should getTitleData", () => {
    const results = getTitleData(state);
    expect(results).toMatchSnapshot();
  });
});