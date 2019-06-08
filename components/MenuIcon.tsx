import * as React from "react";
import { NavigationScreenProps } from "react-navigation";

import { HeaderItem, IoniconsHeaderButtons } from "../screens/Header";

export class MenuIcon extends React.Component<NavigationScreenProps> {
  onPress = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <IoniconsHeaderButtons>
        <HeaderItem iconName={"md-menu"} onPress={this.onPress} title={"Menu"} />
      </IoniconsHeaderButtons>
    );
  }
}

export default MenuIcon;
