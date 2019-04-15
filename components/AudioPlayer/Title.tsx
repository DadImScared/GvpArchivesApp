import * as React from "react";
import { Animated } from "react-native";
import { connect } from "react-redux";

import MarqueeTicker from "react-native-text-ticker";
import Ticker from "../../components/Marquee";
import { IReducerState } from "../../reducers";
import { getTitleData } from "../../reducers/audioPlayer";

interface IOuterProps {
  style?: any;
}

interface ITitleProps extends IOuterProps {
  songName: string;
}

export const Title: React.FunctionComponent<ITitleProps> = React.forwardRef<MarqueeTicker, ITitleProps>(
  ({ songName, style }, ref
) => {
  return (
    <Animated.View style={{ justifyContent: "center", alignItems: "center", ...style }}>
      <Ticker scroll={false} ref={ref} duration={5000} bounce={false} loop={true}>
        {songName || "loading song"}
      </Ticker>
    </Animated.View>
  );
});

const mapStateToProps = (state: IReducerState) => getTitleData(state);

const ConnectedComponent = connect(
  mapStateToProps, null as any, null as any, { forwardRef: true } as any
)(Title) as any;

export default ConnectedComponent;
