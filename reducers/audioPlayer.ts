import { createSelector } from "reselect";
import { ActionType } from "typesafe-actions";

import * as actions from "../actions";
import * as AudioActionTypes from "../actiontypes/audioPlayer";
import { IReducerState } from "./index";
import { getItemsById, ItemsByIdState } from "./itemsById";

export enum ShowPlayerStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  MINIMIZED = "MINIMIZED"
}

export interface IAudioPlayerState {
  currentIndex: number;
  currentSongName: string;
  currentSongUrl: string;
  items: string[];
  name: string;
  duration: number;
  position: number;
  playerType: "song" | "playlist";
  playing: boolean;
  seekTo: number;
  showPlayer: ShowPlayerStatus;
  sliderValue: number;
}

export type AudioPlayerStateAndActions<
  T extends keyof IAudioPlayerState | keyof typeof actions.audioPlayer
> = Pick<IAudioPlayerState & typeof actions.audioPlayer, T>;

export const getInitialAudioPlayerState = (): IAudioPlayerState => ({
  playerType: "song",
  playing: false,
  seekTo: 0,
  showPlayer: ShowPlayerStatus.CLOSED,
  sliderValue: 0,

  // values used when audio is playing a playlist
  currentIndex: 0,
  items: [],
  name: "",

  // values used when audio player is playing single song
  currentSongName: "",
  currentSongUrl: "",

  // playback status from expo player
  duration: 0,
  position: 0
});

const initialAudioPlayerState = getInitialAudioPlayerState();

export default function audioPlayer(
  state: IAudioPlayerState = initialAudioPlayerState,
  action: ActionType<typeof actions.audioPlayer>
) {
  switch (action.type) {
    case AudioActionTypes.UPDATE_PLAYBACKINSTANCE:
      const { payload } = action;
      if (payload.isLoaded) {
        return {
          ...state,
          duration: payload.durationMillis || 0,
          playing: payload.didJustFinish ? false : state.playing,
          position: payload.positionMillis || 0,
          sliderValue: payload.positionMillis || 0
        };
      }
      return state;
    case AudioActionTypes.SEEK_END:
      return {
        ...state,
        seekTo: action.payload.seekTo * (state.duration || 0)
      };
    case AudioActionTypes.SET_SHOW_PLAYER:
      return {
        ...state,
        showPlayer: action.payload.status
      };
    case AudioActionTypes.SEEK_TO:
      return {
        ...state,
        sliderValue: action.payload.seekTo * (state.duration || 0)
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
        showPlayer: state.showPlayer === ShowPlayerStatus.MINIMIZED ? state.showPlayer : action.payload.showPlayer
      };
    default:
      return state;
  }
}

const padWithZero = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time.toString();
};

const getTimestamp = (millis: number): string => {
  const totalSeconds = millis / 1000;
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor(totalSeconds / 60);

  let timeFormat = `${padWithZero(minutes)}:${padWithZero(seconds)}`;
  if (minutes > 59) {
    const hours = Math.floor(minutes / 60);
    timeFormat = `${hours}:${timeFormat}`;
  }
  return timeFormat;
};

const getAudioPlayerState = (state: IReducerState) => state.audioPlayer;

const getItems = (itemIds: string[], itemsById: ItemsByIdState) => itemIds.map((itemId) => itemsById[itemId]);

export const getButtonGroupData = createSelector(
  [getAudioPlayerState],
  ({ playing }) => ({ playing })
);

export const getTitleData = createSelector(
  [getAudioPlayerState, getItemsById],
  (audio, itemsById) => {
    const { playerType, currentSongName, currentIndex, items: itemIds } = audio;
    const items = getItems(itemIds, itemsById);
    return {
      songName: playerType === "song" ? currentSongName : items[currentIndex].title
    };
  }
);

export const getSeekerData = createSelector(
  [getAudioPlayerState],
  ({ playing, position, duration, sliderValue }) => {
    return ({
      playing,
      sliderPosition: sliderValue / duration,
      timestamp: `${getTimestamp(sliderValue)} / ${getTimestamp(duration)}`
    });
  }
);

export const getAudioPlayerData = createSelector(
  [getAudioPlayerState, getItemsById],
  (
    { playing, items: itemIds, currentSongUrl, currentIndex, playerType, seekTo },
    itemsById
  ) => {
    const items = getItems(itemIds, itemsById);
    return {
      playing,
      seekTo,
      uri: playerType === "song" ? currentSongUrl : items[currentIndex].link
    };
  }
);

export const getShowAudioPlayer = createSelector(
  [getAudioPlayerState],
  ({ showPlayer }) => ({ showPlayer })
);
