
import actions from "../../actions";
import reducer, { initialAudioPlayerState } from "../../reducers/audioPlayer";

describe("audioPlayer reducer", () => {
  it("should toggle playing to true", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        actions.audioPlayer.togglePlaying()
      )
    ).toMatchSnapshot();
  });

  it("should set playing to true", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        actions.audioPlayer.setPlaying(true)
      )
    ).toMatchSnapshot();
  });

  it("should set showPlayer to true", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        actions.audioPlayer.showPlayer(true)
      )
    ).toMatchSnapshot();
  });

  it("should set playlist", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        actions.audioPlayer.setPlaylist("my playlist", ["1", "2"])
      )
    ).toMatchSnapshot();
  });

  it("should update song playing in playlist", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        actions.audioPlayer.updateIndex(1)
      )
    ).toMatchSnapshot();
  });

  it("should set song", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        actions.audioPlayer.setSong("songurl", "songname")
      )
    ).toMatchSnapshot();
  });
});
