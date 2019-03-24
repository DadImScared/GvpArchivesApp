import * as React from "react";
import { Slider, Text, View } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { audioPlayer } from "../../actions";
import { IReducerState } from "../../reducers";
import { AudioPlayerStateAndActions, getSeekerData } from "../../reducers/audioPlayer";

interface IDurationSeekerProps extends AudioPlayerStateAndActions<
  "playing" | "setPlaying" | "setSeekTo"
> {
  sliderPosition: number;
  timestamp: string;
}

class DurationSeeker extends React.Component<IDurationSeekerProps> {
  isSeeking = false;

  onSlideStart = () => {
    if (!this.isSeeking) {
      this.isSeeking = true;
      this.props.setPlaying(false);
    }
  };

  onValueChange = (val: number) => {
    this.props.setSeekTo(val);
  };

  onSlideComplete = (value: number) => {
    this.isSeeking = false;
    this.props.setSeekTo(value);
    this.props.setPlaying(true);
  };

  shouldComponentUpdate(nextProps: Readonly<IDurationSeekerProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return !this.isSeeking;
  }

  render() {
    const { sliderPosition, timestamp } = this.props;
    return (
      <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 12}}>
        <Slider
          onTouchStart={this.onSlideStart}
          onValueChange={this.onValueChange}
          value={sliderPosition}
          onSlidingComplete={this.onSlideComplete}
          style={{width: "65%"}}
        />
        <Text>{timestamp}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state: IReducerState) => getSeekerData(state);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPlaying: (playing: boolean) => dispatch(audioPlayer.setPlaying(playing)),
  setSeekTo: (milliseconds: number) => dispatch(audioPlayer.setSeekTo(milliseconds))
});

export default connect(mapStateToProps, mapDispatchToProps)(DurationSeeker) as React.ComponentType;
