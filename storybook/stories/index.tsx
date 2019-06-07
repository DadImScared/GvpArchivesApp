import * as React from "react";

import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { storiesOf } from "@storybook/react-native";
import { View } from "native-base";

import { createStackNavigator, NavigationScreenProps } from "react-navigation";
import { SearchBarStack } from "../../navigation/MainTabNavigator";
import CenterView from "./CenterView";

import { SearchHeader } from "../../screens";
import HomeScreen from "../../screens/HomeScreen";
import { withHeaderSpace, withNavigator, withProvider } from "../utils/decorators";

(storiesOf("SearchBarStack", module) as Story)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withNavigator(() => createStackNavigator({
    SearchBarStack: {
      navigationOptions: (props: NavigationScreenProps) => ({
        headerTitle: <SearchHeader {...props} />
      }),
      screen: SearchBarStack
    }
  })))
  .addDecorator(withProvider)
  .add("renders", () => {
    return <View />;
  });

(storiesOf("Home", module) as Story)
  .addDecorator(withHeaderSpace)
  .add("default", ()  => {
    return (
      <HomeScreen
        navigation={{ navigate: (...args: any[]) => action("navigate")(...args) } as any}
      />
    );
  });
