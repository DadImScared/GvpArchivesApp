import * as React from "react";

import { Body, CardItem, Text, View } from "native-base";
import Icon from "./Icon";
import { routes } from "./SideBar";

interface IProps {
  item: any;
  extraSubHeader?: string;
}

export const CardHeader: React.FunctionComponent<IProps> = ({ item, extraSubHeader }) => (
  <CardItem header={true}>
    <Body>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <Text style={{ width: "80%" }}>{item.title.trim()}</Text>
        <Icon {...routes[item.category].icon} />
      </View>
      <Text note={true}>{routes[item.category].displayName}{extraSubHeader ? `${extraSubHeader}` : null}</Text>
    </Body>
  </CardItem>
);

export default CardHeader;
