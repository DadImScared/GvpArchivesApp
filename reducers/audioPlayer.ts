import { ActionType } from "typesafe-actions";

import actions from "../actions";
import * as AudioActionTypes from "../actiontypes/audioPlayer";

export interface IAudioPlayerState {
  currentIndex: number;
  currentSongName: string;
  currentSongUrl: string;
  items: string[];
  name: string;
  playerType: "song" | "playlist";
  playing: boolean;
  showPlayer: boolean;
}

export const initialAudioPlayerState: IAudioPlayerState = {
  playerType: "song", // either "song" or "playlist"
  playing: false,
  showPlayer: false,

  // values used when audio is playing a playlist
  currentIndex: 0,
  items: [],
  name: "",

  // values used when audio player is playing single song
  currentSongName: "",
  currentSongUrl: ""
};

export default function AudioPlayer(
  state: IAudioPlayerState = initialAudioPlayerState,
  action: ActionType<typeof actions.audioPlayer>
) {
  switch (action.type) {
    case AudioActionTypes.SHOW_PLAYER:
      return {
        ...state,
        showPlayer: action.payload.showPlayer
      };
    case AudioActionTypes.TOGGLE_PLAYING:
      return {
        ...state,
        playing: !state.playing
      };
    case AudioActionTypes.SET_PLAYING:
      return {
        ...state,
        playing: action.payload.playing
      };
    case AudioActionTypes.SET_PLAYLIST:
      return {
        ...state,
        currentIndex: action.payload.currentIndex,
        items: action.payload.items,
        name: action.payload.name,
        playerType: action.payload.playerType,
        playing: action.payload.playing,
        showPlayer: action.payload.showPlayer
      };
    case AudioActionTypes.UPDATE_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payload.newIndex
      };
    case AudioActionTypes.SET_SONG:
      return {
        ...state,
        currentSongName: action.payload.songName,
        currentSongUrl: action.payload.songUrl,
        playerType: action.payload.playerType,
        playing: action.payload.playing,
        showPlayer: action.payload.showPlayer
      };
    default:
      return state;
  }
}
