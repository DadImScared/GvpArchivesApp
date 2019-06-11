import * as React from "react";
import { createStackNavigator, NavigationScreenProps } from "react-navigation";

import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { storiesOf } from "@storybook/react-native";
import { View } from "native-base";

import { SearchBarStack } from "../../navigation/MainTabNavigator";
import { SearchHeader } from "../../screens";
import HomeScreen from "../../screens/HomeScreen";
import { Search } from "../../screens/Search";
import { AutoComplete } from "../../screens/SearchBarScreen/AutoComplete";
import Filter from "../../screens/SearchBarScreen/Filter";
import { RecentSearches } from "../../screens/SearchBarScreen/RecentSearches";
import { autoCompleteTestData } from "../../utils/testData/autoComplete";
import { recentSearchesTestData } from "../../utils/testData/recentSearches";
import { searchTestProps } from "../../utils/testData/search";
import { withHeaderSpace, withNavigator, withProvider } from "../utils/decorators";
import CenterView from "./CenterView";

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

(storiesOf("SearchBarScreen", module) as Story)
  .addDecorator(withHeaderSpace)
  .addDecorator(withProvider)
  .add("Filter", () => {
    return (
      <Filter
        scale={1}
        width={400}
        fontScale={1}
        height={400}
      />
    );
  })
  .add("AutoComplete", () => {
    const props = autoCompleteTestData({ storybook: true });
    return (
      <AutoComplete {...props} />
    );
  })
  .add("RecentSearches", () => {
    const props = recentSearchesTestData({ storybook: true });
    return (
      <RecentSearches {...props} />
    );
  });

(storiesOf("Search", module) as Story)
  .addDecorator(withHeaderSpace)
  .add("with suggestions", () => {
    return (
      <Search {...searchTestProps({ storybook: true }) as any} />
    );
  });
