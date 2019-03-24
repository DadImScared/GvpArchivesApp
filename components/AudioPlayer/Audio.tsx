import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { PlaybackStatus } from "expo";

import { audioPlayer } from "../../actions";
import { IReducerState } from "../../reducers";
import { AudioPlayerStateAndActions, getAudioPlayerData } from "../../reducers/audioPlayer";
import AudioPlayer from "../NativeAudioPlayer";

interface IProps extends AudioPlayerStateAndActions<"playing" | "seekTo"> {
  uri: string;
  onPlaybackStatusUpdate: (status: PlaybackStatus) => void;
}

export class Audio extends React.Component<IProps> {

  onPlaybackUpdate = (status: PlaybackStatus) => {
    // prevents duration slider from flashing when pressed
    if (this.props.playing) {
      this.props.onPlaybackStatusUpdate(status);
    }
  };

  render() {
    const { playing, uri, seekTo } = this.props;
    return (
      <AudioPlayer
        onPlaybackStatusUpdate={this.onPlaybackUpdate}
        playing={playing}
        seekTo={seekTo}
        uri={uri}
      />
    );
  }
}

const mapStateToProps = (state: IReducerState) => getAudioPlayerData(state);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onPlaybackStatusUpdate: (status: PlaybackStatus) => dispatch(audioPlayer.updatePlaybackInstance(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Audio) as React.ComponentType;
