import * as React from "react";
import { Platform } from "react-native";
import {
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  Header,
  NavigationScreenProps
} from "react-navigation";

import SideBar from "../components/SafeAreaSideBar";
import {
  AutoComplete,
  Filter,
  ItemsByCategory,
  RecentSearches,
  Search,
  SearchHeader
} from "../screens";
import HomeScreen from "../screens/HomeScreen";

const SearchBarTabs = createMaterialTopTabNavigator({
  AutoComplete,
  Filter,
  Recent: RecentSearches
}, {
  backBehavior: "initialRoute",
  tabBarOptions: { scrollEnabled: Platform.select({ ios: true, android: false }) }
});

export const SearchBarStack = createStackNavigator({
  SearchBarTabs: {
    screen: SearchBarTabs
  }
}, { headerMode: "none" });

SearchBarStack.navigationOptions = () => ({ drawerLockMode: "locked-closed" });

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  ItemsByCategory: {
    screen: ItemsByCategory
  },
  Search: {
    navigationOptions: {
      headerBackTitle: "Back"
    },
    screen: Search
  },
  SearchBar: {
    navigationOptions: (props: NavigationScreenProps) => ({
      headerStyle: { height: Platform.select({ ios: 55, android: Header.HEIGHT }) },
      headerTitle: <SearchHeader {...props} />
    }),
    screen: SearchBarStack
  }
});

HomeStack.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  let drawerLockMode = "unlocked";
  const currentRoute = navigation.state.routes[navigation.state.index];
  if (currentRoute.routeName === "SearchBar") {
    drawerLockMode = "locked-closed";
  }
  return {
    drawerLockMode,
    title: "Hi"
  };
};

const ItemsByCategoryStack = createStackNavigator({
  ItemsByCategory
});

ItemsByCategoryStack.navigationOptions = () => ({
  title: "items by category"
});

export default createDrawerNavigator({
  HomeStack
}, {contentComponent: ((props) => <SideBar {...props} />)});
