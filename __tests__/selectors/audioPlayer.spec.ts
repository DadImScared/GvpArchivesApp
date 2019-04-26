import { getInitialReducerState } from "../../reducers";
import {
  getAudioPlayerData,
  getButtonGroupData,
  getSeekerData,
  getTitleData
} from "../../reducers/audioPlayer";

const state = getInitialReducerState({
  audioPlayer: {
    currentSongName: "song name",
    currentSongUrl: "song url",
    duration: 450000,
    position: 2000,
    sliderValue: 2000
  }
});

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
