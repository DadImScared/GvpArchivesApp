import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import Ticker from "../../components/Marquee";
import { IReducerState } from "../../reducers";
import { getTitleData } from "../../reducers/audioPlayer";

interface ITitleProps {
  songName: string;
}

export const Title: React.FunctionComponent<ITitleProps> = ({ songName }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Ticker duration={5000} bounce={false} loop={true}>
        {songName}
      </Ticker>
    </View>
  );
};

const mapStateToProps = (state: IReducerState) => getTitleData(state);

export default connect(mapStateToProps)(Title) as React.ComponentType;
