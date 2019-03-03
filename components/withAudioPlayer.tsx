import * as React from "react";

import hoistNonReactStatic from "hoist-non-react-statics";

import { AudioPlayerContext } from "./AudioPlayer/Context";
import { IAudioPlayerState } from "./AudioPlayer/Provider";

interface InjectedProps {
  audio: IAudioPlayerState;
}

export const withAudioPlayer = <P extends InjectedProps>(
  WrappedComponent: React.ComponentType<P>
): any => {
  class WithAudioPlayer extends React.Component<any> {
    static displayName = `withAudioPlayer(${WrappedComponent.name})`;
    static readonly WrappedComponent = WrappedComponent;

    renderComponentWithAudio = (audio: any) => {
      return <WrappedComponent {...this.props as P} audio={audio} />;
    };

    render() {
        return (
          <AudioPlayerContext.Consumer>
            {this.renderComponentWithAudio}
          </AudioPlayerContext.Consumer>
        );
    }
  }
  hoistNonReactStatic(WithAudioPlayer, WrappedComponent);
  return WithAudioPlayer;
};
