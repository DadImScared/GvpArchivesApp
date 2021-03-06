declare module "react-native-text-ticker" {
  import * as React from "react";

  export interface ITextMarqueeProps {
    bounce?: boolean;
    duration?: number;
    easing?: (value: number) => number;
    isInteraction?: boolean;
    loop?: boolean;
    marqueeDelay?: number;
    marqueeOnMount?: boolean;
    onMarqueeComplete?: () => void;
    repeatSpacer?: number;
    scroll?: boolean;
    useNativeDriver?: boolean;
  }

  export default class TextMarquee extends React.PureComponent<ITextMarqueeProps> {
    stopAnimation(): void;
    startAnimation(delay?: number): void;
  }
}
