import * as React from "react";

import { Body, CardItem, Text } from "native-base";
import { routes } from "./SideBar";

interface IProps {
  item: any;
  extraSubHeader?: string;
}

export const CardHeader: React.FunctionComponent<IProps> = ({ item, extraSubHeader }) => (
  <CardItem header={true}>
    <Body>
      <Text>{item.title.trim()}</Text>
      <Text note={true}>{routes[item.category]}{extraSubHeader ? `${extraSubHeader}` : null}</Text>
    </Body>
  </CardItem>
);

export default CardHeader;
