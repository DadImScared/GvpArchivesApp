import * as actions from "../../actions/audioPlayer";

describe("audioPlayer", () => {
  it("should toggle audio playing", () => {
    expect(actions.togglePlaying()).toMatchSnapshot();
  });

  it("should set playing false", () => {
    expect(actions.setPlaying(false)).toMatchSnapshot();
  });

  it("should show audio player", () => {
    expect(actions.showPlayer(true)).toMatchSnapshot();
  });

  it("should set a playlist to start playing", () => {
    expect(actions.setPlaylist("my playlist", ["1", "2"])).toMatchSnapshot();
  });

  it("should update playlist currently playing item", () => {
    expect(actions.updateIndex(2)).toMatchSnapshot();
  });

  it("should set a song to start playing", () => {
    expect(actions.setSong("songurl", "song name")).toMatchSnapshot();
  });
});
