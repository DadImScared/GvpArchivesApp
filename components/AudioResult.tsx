import * as React from "react";

import { Button, Card, CardItem } from "native-base";
import { StyleSheet, Text } from "react-native";

import { Item } from "../reducers/itemsById";
import { IAudioPlayerState } from "./AudioPlayer/Provider";
import CardHeader from "./CardHeader";
import Icon from "./Icon";
import { routes } from "./SideBar";
import { withAudioPlayer } from "./withAudioPlayer";

export interface IAudioResultProps {
  item: Item;
  [key: string]: any;
  audio: IAudioPlayerState;
}

const styles: any = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "space-between",
    margin: 4,
    minWidth: "30%"
  },
  buttonText: {
    color: "white",
    marginLeft: 16,
    marginRight: 16
  }
});

export class AudioResult extends React.Component<IAudioResultProps> {

  onPlay = () => {
    const { item, audio } = this.props;
    audio.setSong(item.link, item.title);
  };

  shouldComponentUpdate(nextProps: Readonly<IAudioResultProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.item !== nextProps.item;
  }

  render() {
    const { item } = this.props;
    return (
      <Card>
        <CardHeader item={item} />
        <CardItem style={{ justifyContent: "space-between" }} footer={true}>
          <Button
            onPress={this.onPlay}
            style={{...styles.button, backgroundColor: routes[item.category].icon.style.color}}
          >
            <Text style={styles.buttonText}>
              Play
            </Text>
            <Icon name={"play"} />
          </Button>
          <Button info={true} style={styles.button}>
            <Text style={styles.buttonText}> Add To Playlist</Text>
            <Icon type={"MaterialCommunityIcons"} name={"playlist-plus"} />
          </Button>
        </CardItem>
      </Card>
    );
  }
}

export default withAudioPlayer<IAudioResultProps>(AudioResult);
