import * as React from "react";

import { Button, Card, CardItem } from "native-base";
import { StyleSheet, Text } from "react-native";

import { Item } from "../reducers/itemsById";
import CardHeader from "./CardHeader";
import Icon from "./Icon";

export interface IAudioResultProps {
  item: Item;
  [key: string]: any;
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

export const AudioResult: React.FC<IAudioResultProps> = ({ item }) => (
  <Card>
    <CardHeader item={item} />
    <CardItem style={{ justifyContent: "space-between" }} footer={true}>
      <Button primary={true} style={styles.button}>
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

export default AudioResult;
