import * as React from "react";

import Ticker, { ITextMarqueeProps } from "react-native-text-ticker";

const Marquee: React.FunctionComponent<ITextMarqueeProps> = ({ children, ...other }) => (
  <Ticker {...other}>
    {children}
  </Ticker>
);

export default Marquee;
