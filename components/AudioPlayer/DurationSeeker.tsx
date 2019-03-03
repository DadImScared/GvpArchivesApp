import * as React from "react";
import { Slider, Text, View } from "react-native";

interface IDurationSeekerProps {
  isSeeking: boolean;
  getSeekSliderPosition: () => number;
  getTimeStamp: () => string;
  onSeekSliderChange: () => void;
  onSeekSliderComplete: (value: number) => void;
}

export const DurationSeeker: React.FunctionComponent<IDurationSeekerProps> = (
  {
    getTimeStamp,
    getSeekSliderPosition,
    onSeekSliderChange,
    onSeekSliderComplete,
  }
) => (
  <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 12 }}>
    <Slider
      value={getSeekSliderPosition()}
      onValueChange={onSeekSliderChange}
      onSlidingComplete={onSeekSliderComplete}
      style={{ width: "65%" }}
    />
    <Text>{getTimeStamp()}</Text>
  </View>
);

export default DurationSeeker;
