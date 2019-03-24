import * as React from "react";
import { StyleSheet, View as Wrapper } from "react-native";
import { connect } from "react-redux";

import { IReducerState } from "../../reducers";
import { getShowAudioPlayer } from "../../reducers/audioPlayer";
import View from "./View";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    bottom: 0,
    padding: 8,
    position: "absolute",
    width: "100%",
  }
});

interface IProps {
  showPlayer: boolean;
}

export class AudioPlayer extends React.Component<IProps> {
  render() {
    return (
      <Wrapper style={styles.wrapper}>
        <View />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: IReducerState) => getShowAudioPlayer(state);

export default connect(mapStateToProps)(AudioPlayer) as React.ComponentType;
