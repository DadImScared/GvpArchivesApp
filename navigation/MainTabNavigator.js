import React from 'react';
import { Platform } from "react-native";
import { createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator, Header } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SideBar from "../components/SafeAreaSideBar";
import {
  AutoComplete,
  Filter,
  Search,
  SearchHeader,
  RecentSearches,
  ItemsByCategory
} from "../screens";

const SearchBarTabs = createMaterialTopTabNavigator({
  AutoComplete,
  Filter,
  Recent: RecentSearches
}, {
  backBehavior: "initialRoute",
  tabBarOptions: { scrollEnabled: Platform.select({ ios: true, android: false }) }
});

const SearchBarStack = createStackNavigator({
  SearchBarTabs: {
    screen: SearchBarTabs
  }
}, { headerMode: "none" });

SearchBarStack.navigationOptions = () => ({ drawerLockMode: "locked-closed" });

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  ItemsByCategory,
  SearchBar: {
    screen: SearchBarStack,
    navigationOptions: (props) => ({
      headerStyle: { height: Platform.select({ ios: 55, android: Header.HEIGHT }) },
      headerTitle: <SearchHeader {...props} />
    })
  },
  Search: {
    screen: Search,
    navigationOptions: {
      headerBackTitle: "Back"
    }
  }
});

HomeStack.navigationOptions = ({ navigation }) => {
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

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  // tabBarLabel: 'Links',
  // tabBarIcon: ({ focused }) => (
  //   <TabBarIcon
  //     focused={focused}
  //     name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
  //   />
  // ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  // tabBarIcon: ({ focused }) => (
  //   <TabBarIcon
  //     focused={focused}
  //     name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
  //   />
  // ),
};

const ItemsByCategoryStack = createStackNavigator({
  ItemsByCategory
});

ItemsByCategoryStack.navigationOptions = () => ({
  title: "items by category"
});

export default createDrawerNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
}, {contentComponent: (props => <SideBar {...props} />)});
