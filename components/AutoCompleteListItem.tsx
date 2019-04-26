import * as React from "react";
import { Text } from "react-native";

import { ListItem } from "native-base";

interface IProps {
  text: string;
}

export class AutoCompleteListItem extends React.Component<IProps> {

  render() {
    return (
      <ListItem button={true} noIndent={true}>
        <Text>{this.props.text}</Text>
      </ListItem>
    );
  }
}

export default AutoCompleteListItem;
