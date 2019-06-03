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
        {/*
            native base button sets backgroundColor to null but this crashes on android
            fix by setting backgroundColor to empty string
         */}
        <Button transparent={true} style={{ backgroundColor: "" }} primary={true} onPress={togglePlaying}>
          <Icon style={{ color: "#3F51B5"}} name={playing ? "pause" : "play"} />
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
