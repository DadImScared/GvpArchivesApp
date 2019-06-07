import React from 'react';

import { storiesOf } from '@storybook/react-native';

import { createStackNavigator } from "react-navigation";
import { SearchBarStack } from "../../navigation/MainTabNavigator";
import CenterView from './CenterView';

import { SearchHeader } from "../../screens";
import { withProvider, withNavigator } from "../utils/decorators";

storiesOf("SearchBarStack", module).addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withNavigator(() => createStackNavigator({
    SearchBarStack: {
      screen: SearchBarStack,
      navigationOptions: (props) => ({
        headerTitle: <SearchHeader {...props} />
      })
    }
  })))
  .addDecorator(withProvider)
  .add("renders", () => {
  });
