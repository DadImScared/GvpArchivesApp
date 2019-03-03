import * as React from "react";
import { View } from "react-native";

import { Button } from "native-base";

import Icon from "../Icon";

interface IButtonGroupProps {
  isPlaying: boolean;
  onPlayPausePressed: () => void;
}

export class ButtonGroup extends React.Component<IButtonGroupProps> {
  shouldComponentUpdate(nextProps: Readonly<IButtonGroupProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.isPlaying !== nextProps.isPlaying;
  }

  render() {
    const { isPlaying, onPlayPausePressed } = this.props;
    return (
      <View style={{ justifyContent: "center", flexDirection: "row" }}>
        <Button transparent={true} onPress={onPlayPausePressed}>
          <Icon name={isPlaying ? "pause" : "play"} />
        </Button>
      </View>
    );
  }
}

export default ButtonGroup;
