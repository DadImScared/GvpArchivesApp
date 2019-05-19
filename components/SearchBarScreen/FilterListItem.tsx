import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { CheckBox, ListItem, NativeBase, Text } from "native-base";

import { SearchStateAndActions } from "../../reducers/search";
import { routes } from "../SideBar";

const styles = StyleSheet.create({
  innerListWrapper: {
    alignContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 0
  },
  text: {
    alignSelf: "center",
    marginLeft: 8,
    marginRight: 0,
    minWidth: 100
  }
});

interface IProps extends NativeBase.ListItem, SearchStateAndActions<"toggleCategory"> {
  category: string;
  addRow: (category: string, width: number) => void;
}

export class FilterListItem extends React.Component<IProps> {

  toggleCategory = Platform.select<any>({
    default: () => this.props.toggleCategory(this.props.category),
    ios: () => setTimeout(() => this.props.toggleCategory(this.props.category), 50)
  });

  addToRow = ({ nativeEvent: { layout: { width } } }: any) => {
    this.props.addRow(this.props.category, width + 36);
  };

  render() {
    const { category, toggleCategory, addRow, ...other } = this.props;
    return (
      <ListItem button={true} onPress={this.toggleCategory} {...other}>
        <View style={styles.innerListWrapper} onLayout={this.addToRow}>
          <CheckBox checked={other.selected} color={routes[category].icon.style.color} />
          <Text style={styles.text}>{routes[category].displayName}</Text>
        </View>
      </ListItem>
    );
  }
}

export default FilterListItem;
