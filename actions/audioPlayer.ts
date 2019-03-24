import { PlaybackStatus } from "expo";
import { action } from "typesafe-actions";

import * as AudioActionTypes from "../actiontypes/audioPlayer";

const setSeekTo = (seekTo: number) => action(AudioActionTypes.SEEK_TO, { seekTo });

const togglePlaying = () => action(AudioActionTypes.TOGGLE_PLAYING);

const setPlaying = (playing: boolean) => action(AudioActionTypes.SET_PLAYING, { playing });

const showPlayer = (shouldShowPlayer: boolean) => {
  return action(AudioActionTypes.SHOW_PLAYER, { showPlayer: shouldShowPlayer });
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
      showPlayer: true,
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
      showPlayer: true
    }
  );
};

export default {
  setPlaying,
  setPlaylist,
  setSeekTo,
  setSong,
  showPlayer,
  togglePlaying,
  updateIndex,
  updatePlaybackInstance
};
