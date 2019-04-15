import { audioPlayer } from "../../actions";
import reducer, { getInitialAudioPlayerState, ShowPlayerStatus } from "../../reducers/audioPlayer";

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

  it("should update playback instance", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        audioPlayer.updatePlaybackInstance({
          durationMillis: 25,
          isLoaded: true,
          positionMillis: 25
        } as any)
      )
    ).toMatchSnapshot();
  });

  it("should seek end", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        audioPlayer.seekEnd(25)
      )
    ).toMatchSnapshot();
  });

  it("should set show player to open", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        audioPlayer.setShowPlayer(ShowPlayerStatus.OPEN)
      )
    ).toMatchSnapshot();
  });

  it("should seek to", () => {
    expect(
      reducer(
        initialAudioPlayerState,
        audioPlayer.setSeekTo(25)
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
