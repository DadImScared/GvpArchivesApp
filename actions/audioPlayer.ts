import { PlaybackStatus } from "expo";
import { action } from "typesafe-actions";

import * as AudioActionTypes from "../actiontypes/audioPlayer";
import { ShowPlayerStatus } from "../reducers/audioPlayer";

const setSeekTo = (seekTo: number) => action(AudioActionTypes.SEEK_TO, { seekTo });

const seekEnd = (seekTo: number) => action(AudioActionTypes.SEEK_END, { seekTo });

const togglePlaying = () => action(AudioActionTypes.TOGGLE_PLAYING);

const setPlaying = (playing: boolean) => action(AudioActionTypes.SET_PLAYING, { playing });

const setShowPlayer = (status: ShowPlayerStatus) => {
  return action(AudioActionTypes.SET_SHOW_PLAYER, { status });
};

const updatePlaybackInstance = (playbackStatus: PlaybackStatus) => {
  return action(AudioActionTypes.UPDATE_PLAYBACKINSTANCE, { ...playbackStatus });
};

const setPlaylist = (name: string, items: string[], currentIndex = 0) => {
  return action(
    AudioActionTypes.SET_PLAYLIST,
    {
      currentIndex,
      items,
      name,
      playerType: "playlist" as any,
      playing: true,
      showPlayer: ShowPlayerStatus.OPEN,
    }
  );
};

const updateIndex = (newIndex: number) => action(AudioActionTypes.UPDATE_CURRENT_INDEX, { newIndex });

const setSong = (songUrl: string, songName: string) => {
  return action(
    AudioActionTypes.SET_SONG,
    {
      songName,
      songUrl,
      playerType: "song",
      playing: true,
      showPlayer: ShowPlayerStatus.OPEN
    }
  );
};

export default {
  seekEnd,
  setPlaying,
  setPlaylist,
  setSeekTo,
  setShowPlayer,
  setSong,
  togglePlaying,
  updateIndex,
  updatePlaybackInstance
};
