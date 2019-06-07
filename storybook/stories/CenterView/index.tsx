import * as React from "react";
import { View } from "react-native";
import style from "./style";

export default function CenterView({ children }: any) {
  return <View style={style.main}>{children}</View>;
}

CenterView.defaultProps = {
  children: null,
};
