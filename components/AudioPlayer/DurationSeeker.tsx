import * as React from "react";
import { Slider, SliderProps, Text } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { audioPlayer } from "../../actions";
import { IReducerState } from "../../reducers";
import { AudioPlayerStateAndActions, getSeekerData } from "../../reducers/audioPlayer";

interface IDurationSeekerProps extends AudioPlayerStateAndActions<
  "playing" |
  "setPlaying" |
  "setSeekTo" |
  "seekEnd"
> {
  sliderPosition: number;
  timestamp: string;
}

class DurationSeeker extends React.Component<IDurationSeekerProps> {
  onSlideStart = () => {
    this.props.setPlaying(false);
  };

  onSlideComplete = (value: number) => {
    this.props.seekEnd(value);
    // prevent player from starting from before seek position
    setTimeout(() => {
      this.props.setPlaying(true);
    }, 200);
  };

  render() {
    const { sliderPosition, timestamp, ...other } = this.props;
    return (
      <React.Fragment>
        <Slider
          {...other}
          onTouchStart={this.onSlideStart}
          value={sliderPosition}
          onSlidingComplete={this.onSlideComplete}
          style={{ flex: 1 }}
        />
        <Text style={{ minWidth: 70 }}>{timestamp}</Text>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IReducerState) => getSeekerData(state);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  seekEnd: (milliseconds: number) => dispatch(audioPlayer.seekEnd(milliseconds)),
  setPlaying: (playing: boolean) => dispatch(audioPlayer.setPlaying(playing)),
  setSeekTo: (milliseconds: number) => dispatch(audioPlayer.setSeekTo(milliseconds))
});

export default connect(mapStateToProps, mapDispatchToProps)(DurationSeeker) as React.ComponentType<SliderProps>;
