import * as React from "react";
import { Text } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { ListItem } from "native-base";

import { ISearchState } from "../../reducers/search";
import { searchParams } from "../../screens/Search";

interface IProps extends ISearchState {
  text: string;
  navigation: NavigationScreenProp<any>;
}

export class AutoCompleteListItem extends React.Component<IProps> {

  navigateSearch = () => {
    const { navigation, text, categories } = this.props;
    const parentNavigation = (navigation as any).dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent();
    parentNavigation.replace("Search", searchParams(text, categories));
  };

  render() {
    return (
      <ListItem button={true} noIndent={true} onPress={this.navigateSearch}>
        <Text>{this.props.text}</Text>
      </ListItem>
    );
  }
}

export default AutoCompleteListItem;
