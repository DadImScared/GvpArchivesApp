import * as React from "react";

import { Card } from "native-base";
import { View } from "react-native";

import { Item } from "../reducers/itemsById";
import AudioResult from "./AudioResult";
import CardHeader from "./CardHeader";

const CATEGORIES: { [key: string]: any | string } = {
  bhagavatpatrika: "Bhagavat Patrika",
  book: "Books",
  harikatha: "Harikatha",
  harmonistmagazine: "Harmonist Magazine",
  harmonistmonthly: "Harmonist Monthly",
  lecture: "Lecture",
  movie: "Movies",
  song: AudioResult,
};

export interface IRenderItemProps {
  item: Item;
}

export const RenderItem: React.FunctionComponent<IRenderItemProps> = ({ item }) => (
  <View style={{ padding: 4 }}>
    {
      typeof CATEGORIES[item.category] === "string" ?
        <Card>
          <CardHeader item={item} />
        </Card>
        :
        React.createElement(CATEGORIES[item.category], { item })}
  </View>
);

export default RenderItem;
