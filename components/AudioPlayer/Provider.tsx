
import * as React from "react";

import { Audio, PlaybackObject, PlaybackStatus } from "expo";
import { Item } from "../../reducers/itemsById";
import { AudioPlayerContext } from "./Context";

type SetPlaylist = (name: string, items: Item[], index: number) => void;
type SetSong = (uri: string, name: string) => Promise<void>;

export interface IAudioPlayerState {
  currentIndex: number;
  currentSongName: string;
  currentSongURL: string;
  getSeekSliderPosition: () => number;
  getSongName: () => string;
  getSongURL: () => string;
  getTimeStamp: () => string;
  isBuffering: boolean;
  isPlaying: boolean;
  isSeeking: boolean;
  items: Item[];
  muted: boolean;
  name: string;
  nextSong: () => void;
  onMutePressed: () => void;
  onPlayPausePressed: () => void;
  onSeekSliderChange: () => void;
  onSeekSliderComplete: (value: number) => Promise<void>;
  onStopPressed: () => void;
  playbackInstanceDuration: number | undefined;
  playbackInstancePosition: number | undefined;
  playerType: "song" | "playlist";
  previousSong: () => void;
  seekSong: (index: number) => void;
  setPlaylist: SetPlaylist;
  setSong: SetSong;
}

export class AudioPlayerProvider extends React.Component<{}, IAudioPlayerState> {
  isSeeking = false;
  playbackInstance: PlaybackObject | null = null;
  constructor(props: any) {
    super(props);
    this.state = {
      currentIndex: 0,
      currentSongName: "",
      currentSongURL: "",
      getSeekSliderPosition: this.getSeekSliderPosition,
      getSongName: this.getSongName,
      getSongURL: this.getSongURL,
      getTimeStamp: this.getTimestamp,
      isBuffering: false,
      isPlaying: false,
      isSeeking: false,
      items: [],
      muted: false,
      name: "",
      nextSong: this.nextSong,
      onMutePressed: this.onMutePressed,
      onPlayPausePressed: this.onPlayPausePressed,
      onSeekSliderChange: this.onSeekSliderValueChange,
      onSeekSliderComplete: this.onSeekSliderSlidingComplete,
      onStopPressed: this.onStopPressed,
      playbackInstanceDuration: undefined,
      playbackInstancePosition: undefined,
      playerType: "song" as "song" | "playlist",
      previousSong: this.previousSong,
      seekSong: this.seekSong,
      setPlaylist: this.setPlaylist,
      setSong: this.setSong
    };
  }

  setSong: SetSong = async (uri, name) => {
    this.setState({
      currentSongName: name,
      currentSongURL: uri,
      playerType: "song"
    });
    await this.playSong(uri);
  };

  setPlaylist: SetPlaylist = (name, items, index = 0) => {
    this.setState({
      items,
      name,
      currentIndex: index,
      playerType: "playlist",
    });
    this.playSong(items[index].link);
  };

  playSong = async (uri: string): Promise<void> => {
    if (this.playbackInstance !== null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance = null;
    }
    const { sound } = await (Audio.Sound as any).createAsync(
      { uri },
      { shouldPlay: true },
      this.onPlaybackStatusUpdate
    );

    this.playbackInstance = sound;
  };

  previousSong = (): void => {
    this.setState(({ currentIndex }: any) => {
      return {
        currentIndex: currentIndex === 0 ? currentIndex : currentIndex - 1
      };
    }, () => {
      this.playSong(this.getSongURL());
    });
  };

  seekSong = (index: number): void => {
    this.setState({ currentIndex: index });
    this.playSong(this.state.items[index].link);
  };

  nextSong = (): void => {
    this.setState(({ currentIndex, items }: any) => {
      const index = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
      return {
        currentIndex: index
      };
    }, () => {
      this.playSong(this.getSongURL());
    });
  };

  onPlayPausePressed = (): void => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  // prevent flickering of seek bar and pause button
  shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<IAudioPlayerState>, nextContext: any): boolean {
    return !this.isSeeking;
  }

  onPlaybackStatusUpdate = (status: PlaybackStatus): void => {
    if (status.isLoaded) {
      this.setState({
        ...this.state,
        isBuffering: status.isBuffering,
        isPlaying: status.isPlaying,
        muted: status.isMuted,
        playbackInstanceDuration: status.durationMillis,
        playbackInstancePosition: status.positionMillis,
      });
    }
  };

  onStopPressed = (): void => {
    if (this.playbackInstance !== null) {
      this.playbackInstance.stopAsync();
    }
  };

  onMutePressed = (): void => {
    if (this.playbackInstance !== null) {
      this.playbackInstance.setIsMutedAsync(!this.state.muted);
    }
  };

  onSeekSliderValueChange = (): void => {
    if (this.playbackInstance !== null && !this.isSeeking) {
      this.setState({ isPlaying: false }, () => this.isSeeking = true);

      this.playbackInstance && this.playbackInstance.pauseAsync();
    }
  };

  onSeekSliderSlidingComplete = async (value: number): Promise<void> => {
    if (this.playbackInstance !== null) {
      const { playbackInstanceDuration } = this.state;
      if (playbackInstanceDuration) {
        const seekPosition = value * playbackInstanceDuration;
        await this.playbackInstance.playFromPositionAsync(seekPosition);
        this.isSeeking = false;
      }
    }
  };

  getSeekSliderPosition = (): number => {
    const { playbackInstanceDuration, playbackInstancePosition } = this.state;
    if (this.playbackInstance && playbackInstanceDuration && playbackInstancePosition) {
      return playbackInstancePosition / playbackInstanceDuration;
    }
    return 0;
  };

  getSongName = (): string => {
    const { currentIndex, currentSongName, items, playerType } = this.state;
    if (playerType === "song") {
      return currentSongName;
    } else {
      return items[currentIndex].title;
    }
  };

  getSongURL = (): string => {
    const { currentIndex, currentSongURL, items, playerType } = this.state;
    if (playerType === "song") {
      return currentSongURL;
    } else {
      return items[currentIndex].link;
    }
  };

  getMMSSFromMillis = (millis: number): string => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (time: number) => {
      if (time < 10) {
        return `0${time}`;
      }
      return time.toString();
    };
    let timeFormat = `${padWithZero(minutes)}:${padWithZero(seconds)}`;
    if (minutes > 59) {
      const hours = Math.floor(minutes / 60);
      timeFormat = `${hours}:${timeFormat}`;
    }
    return timeFormat;
  };

  getTimestamp = (): string => {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this.getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this.getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return "00:00 / 00:00";
  };

  render() {
    return (
      <AudioPlayerContext.Provider value={this.state}>
        {this.props.children}
      </AudioPlayerContext.Provider>
    );
  }
}

export default AudioPlayerProvider;
