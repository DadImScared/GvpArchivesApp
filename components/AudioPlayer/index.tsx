import * as React from "react";
import { StyleSheet, View } from "react-native";

import { withAudioPlayer } from "../withAudioPlayer";
import ButtonGroup from "./ButtonGroup";
import DurationSeeker from "./DurationSeeker";
import { IAudioPlayerState } from "./Provider";
import Title from "./Title";

interface IProps {
  audio: IAudioPlayerState;
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    bottom: 0,
    padding: 8,
    position: "absolute",
    width: "100%",
  }
});

export class AudioPlayer extends React.Component<IProps> {
  render() {
    const {
      audio: {
        isSeeking,
        isPlaying,
        onPlayPausePressed,
        getSongName,
        getSeekSliderPosition,
        getTimeStamp,
        onSeekSliderChange,
        onSeekSliderComplete

      }
    } = this.props;
    return (
      <View style={styles.wrapper}>
        <Title getSongName={getSongName} />
        <DurationSeeker
          isSeeking={isSeeking}
          getSeekSliderPosition={getSeekSliderPosition}
          getTimeStamp={getTimeStamp}
          onSeekSliderChange={onSeekSliderChange}
          onSeekSliderComplete={onSeekSliderComplete}
        />
        <ButtonGroup
          onPlayPausePressed={onPlayPausePressed}
          isPlaying={isPlaying}
        />
      </View>
    );
  }
}

export default withAudioPlayer(AudioPlayer) as any; // property error without "any"
