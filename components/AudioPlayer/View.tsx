import * as React from "react";
import { View as Wrapper } from "react-native";

import Audio from "./Audio";
import ButtonGroup from "./ButtonGroup";
import DurationSeeker from "./DurationSeeker";
import Title from "./Title";

const View = () => (
  <Wrapper>
    <Audio />
    <Title/>
    <DurationSeeker/>
    <ButtonGroup/>
  </Wrapper>
);

export default View;
