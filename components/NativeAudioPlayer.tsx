import * as React from "react";

import { Audio, PlaybackObject, PlaybackStatus } from "expo";

interface INativeAudioPlayerProps {
  onPlaybackStatusUpdate: (status: PlaybackStatus) => void;
  playing: boolean;
  seekTo: number;
  uri: string;
}

type AudioControls = "uri" | "playing" | "seekTo";

class NativeAudioPlayer extends React.Component<INativeAudioPlayerProps> {
  playbackInstance: PlaybackObject | null = null;

  playSong = async (uri: string): Promise<void> => {
    const { onPlaybackStatusUpdate } = this.props;
    if (this.playbackInstance !== null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance = null;
    }
    if (!uri) return;
    const { sound } = await (Audio.Sound as any).createAsync(
      { uri },
      { shouldPlay: this.props.playing },
      onPlaybackStatusUpdate
    );

    this.playbackInstance = sound;
  };

  _uri = (uri: string) => {
    this.playSong(uri);
  };

  _seekTo = async (value: number): Promise<void> => {
    if (this.playbackInstance !== null && !this.props.playing) {
      // const { playbackInstanceDuration } = this.state;
      await this.playbackInstance.playFromPositionAsync(value);
    }
  };

  _playing = (playing: boolean) => {
    if (this.playbackInstance !== null) {
      // @ts-ignore
      this.playbackInstance[`${playing ? "play" : "pause"}Async`]();
    }
  };

  async componentDidMount(): Promise<void> {
    for (const key of Object.keys(this.props) as AudioControls[]) {
      // @ts-ignore
      const statusUpdateMethod = this[`_${key}`];

      if (statusUpdateMethod) {
        await statusUpdateMethod(this.props[key]);
      }
    }
  }

  async componentDidUpdate(
    prevProps: Readonly<INativeAudioPlayerProps>,
    prevState: Readonly<{}>, snapshot?: any
  ): Promise<void> {
    for (const key of Object.keys(this.props) as AudioControls[]) {
      // @ts-ignore
      const statusUpdateMethod = this[`_${key}`];
      const newStatusUpdate = this.props[key];

      if (statusUpdateMethod && newStatusUpdate !== prevProps[key]) {
        await statusUpdateMethod(this.props[key]);
      }
    }
  }

  componentWillUnmount(): void {
    if (this.playbackInstance !== null) {
      this.playbackInstance.unloadAsync();
      this.playbackInstance = null;
    }
  }

  render() {
    return null;
  }
}

export default NativeAudioPlayer;
