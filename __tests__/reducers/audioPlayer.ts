import { audioPlayer } from "../../actions";
import reducer, { getInitialAudioPlayerState } from "../../reducers/audioPlayer";

const initialAudioPlayerState = getInitialAudioPlayerState();

describe("audioPlayer reducer", () => {
  it("should toggle playing to true", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        audioPlayer.togglePlaying()
      )
    ).toMatchSnapshot();
  });

  it("should set playing to true", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        audioPlayer.setPlaying(true)
      )
    ).toMatchSnapshot();
  });

  it("should set showPlayer to true", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        audioPlayer.showPlayer(true)
      )
    ).toMatchSnapshot();
  });

  it("should set playlist", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        audioPlayer.setPlaylist("my playlist", ["1", "2"])
      )
    ).toMatchSnapshot();
  });

  it("should update song playing in playlist", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        audioPlayer.updateIndex(1)
      )
    ).toMatchSnapshot();
  });

  it("should set song", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        audioPlayer.setSong("songurl", "songname")
      )
    ).toMatchSnapshot();
  });
});
