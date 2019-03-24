import * as React from "react";

import Ticker, { ITextMarqueeProps } from "react-native-text-ticker";

const ForwardedMarquee = React.forwardRef<Ticker, ITextMarqueeProps>(({ children, ...other }, ref) => (
  <Ticker {...other} ref={ref}>
    {children}
  </Ticker>
));

export default ForwardedMarquee;
