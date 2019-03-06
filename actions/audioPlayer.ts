import { action } from "typesafe-actions";

import * as AudioActionTypes from "../actiontypes/audioPlayer";

export const togglePlaying = () => action(AudioActionTypes.TOGGLE_PLAYING);

export const setPlaying = (playing: boolean) => action(AudioActionTypes.SET_PLAYING, { playing });

export const showPlayer = (shouldShowPlayer: boolean) => {
  return action(AudioActionTypes.SHOW_PLAYER, { showPlayer: shouldShowPlayer });
};

export const setPlaylist = (name: string, items: string[], currentIndex = 0) => {
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

export const updateIndex = (newIndex: number) => action(AudioActionTypes.UPDATE_CURRENT_INDEX, { newIndex });

export const setSong = (songUrl: string, songName: string) => {
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

export interface IAudioPlayerActions {
  updateIndex: typeof updateIndex;
  togglePlaying: typeof togglePlaying;
  setSong: typeof setSong;
  setPlaying: typeof setPlaying;
  setPlaylist: typeof setPlaylist;
  showPlayer: typeof showPlayer;
}

export default {
  setPlaying,
  setPlaylist,
  setSong,
  showPlayer,
  togglePlaying,
  updateIndex,
};
