import * as React from "react";

import { View } from "react-native";
import Ticker from "../../components/Marquee";

interface ITitleProps {
  getSongName: () => string;
}

export const Title: React.FunctionComponent<ITitleProps> = ({ getSongName }) => (
  <View style={{ justifyContent: "center", alignItems: "center" }}>
    <Ticker duration={5000} bounce={false} loop={true}>
      {getSongName()}
    </Ticker>
  </View>
);

export default Title;
