import { audioPlayer } from "../../actions";

describe("audioPlayer", () => {
  it("should toggle audio playing", () => {
    expect(audioPlayer.togglePlaying()).toMatchSnapshot();
  });

  it("should set playing to true", () => {
    expect(audioPlayer.setPlaying(true)).toMatchSnapshot();
  });

  it("should show audio player", () => {
    expect(audioPlayer.showPlayer(true)).toMatchSnapshot();
  });

  it("should set a playlist to start playing", () => {
    expect(audioPlayer.setPlaylist("my playlist", ["1", "2"])).toMatchSnapshot();
  });

  it("should update playlist currently playing item", () => {
    expect(audioPlayer.updateIndex(2)).toMatchSnapshot();
  });

  it("should set a song to start playing", () => {
    expect(audioPlayer.setSong("songurl", "song name")).toMatchSnapshot();
  });
});
