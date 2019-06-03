import * as React from "react";

import { Button, Card, CardItem } from "native-base";
import { StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { audioPlayer } from "../actions";
import { Item } from "../reducers/itemsById";
import CardHeader from "./CardHeader";
import Icon from "./Icon";
import { routes } from "./SideBar";

export interface IAudioResultProps {
  item: Item;
  [key: string]: any;
  setSong: (songUrl: string, songName: string) => void;
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
    const { item, setSong } = this.props;
    setSong(item.link, item.title);
  };

  render() {
    const { item } = this.props;
    return (
      <Card>
        <CardHeader item={item} />
        <CardItem style={{ justifyContent: "space-between" }} footer={true}>
          <Button
            onPress={this.onPlay}
            style={{...styles.button, backgroundColor: routes[item.category].icon.style.color }}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSong: (url: string, title: string) => dispatch(audioPlayer.setSong(url, title))
});

export default connect(null, mapDispatchToProps)(AudioResult);
