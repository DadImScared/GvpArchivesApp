import * as React from "react";

import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import SideBar from "./SideBar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const SafeAreaSideBar = (props: any) => (
  <SafeAreaView style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
    <SideBar {...props} />
  </SafeAreaView>
);

export default SafeAreaSideBar;
