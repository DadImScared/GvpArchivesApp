import * as React from "react";
import { BackHandler, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";

import { Header as BaseHeader, Input, Item } from "native-base";

import { Icon } from "../../components/Icon";

export class Header extends React.Component<NavigationScreenProps> {
  textRef!: any;
  didFocus!: any;
  willBlur!: any;

  componentDidMount() {
    this.didFocus = this.props.navigation.addListener("didFocus", () => {
      this.textRef && this.textRef._root.focus();
      BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    });
    this.willBlur = this.props.navigation.addListener("willBlur", () => {
      BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    });
  }

  componentWillUnmount(): void {
    this.didFocus && this.didFocus.remove();
    this.willBlur && this.willBlur.remove();
  }

  setTextRef = (el: Input) => this.textRef = el;

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  render() {
    return (
      <View style={{ width: "100%" }}>
        <BaseHeader noShadow={true} style={{ backgroundColor: "white" }} searchBar={true}>
          <Item rounded={true}>
            <Icon name={"ios-search"} />
            <Input ref={this.setTextRef} placeholder={"Search"} />
          </Item>
        </BaseHeader>
      </View>
    );
  }
}

export default connect()(Header);
