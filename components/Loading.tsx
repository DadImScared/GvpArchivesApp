import * as React from "react";

import { Spinner } from "native-base";
import { View } from "react-native";

export const Loading: React.FunctionComponent<{ isLoading: boolean }> = ({ isLoading }) => isLoading ? (
  <View>
    <Spinner />
  </View>
) : null;

export default Loading;
