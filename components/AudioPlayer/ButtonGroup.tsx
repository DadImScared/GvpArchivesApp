import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Button } from "native-base";

import { audioPlayer } from "../../actions";
import { IReducerState } from "../../reducers";
import { AudioPlayerStateAndActions, getButtonGroupData } from "../../reducers/audioPlayer";
import Icon from "../Icon";

interface IButtonGroupProps extends AudioPlayerStateAndActions<"playing" | "togglePlaying"> {}

export class ButtonGroup extends React.Component<IButtonGroupProps> {
  render() {
    const { playing, togglePlaying } = this.props;
    return (
      <View style={{ justifyContent: "center", flexDirection: "row" }}>
        <Button transparent={true} onPress={togglePlaying}>
          <Icon name={playing ? "pause" : "play"} />
        </Button>
      </View>
    );
  }
}

const mapStateToProps = (state: IReducerState) => getButtonGroupData(state);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  togglePlaying: () => dispatch(audioPlayer.togglePlaying())
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonGroup) as React.ComponentType;
