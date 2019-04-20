import * as React from "react";

import { Ionicons } from "@expo/vector-icons";
import { NavigationScreenProps } from "react-navigation";
import HeaderButtons, { HeaderButton } from "react-navigation-header-buttons";

const IoniconsHeaderButton = (props: any) => (
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={"blue"} />
);

export const IoniconsHeaderButtons = (props: any) => (
  <HeaderButtons
    HeaderButtonComponent={IoniconsHeaderButton}
    {...props}
  />
);

export const HeaderItem = HeaderButtons.Item;

class HeaderRight extends React.Component<NavigationScreenProps> {

  searchPress = () => {
    this.props.navigation.navigate("SearchBar");
  };

  render() {
    return (
      <IoniconsHeaderButtons>
        <HeaderItem iconName={"ios-search"} onPress={this.searchPress} title={"Search"} />
      </IoniconsHeaderButtons>
    );
  }
}

export const headerRight = ({ navigation }: NavigationScreenProps) => (
  <HeaderRight navigation={navigation} />
);
