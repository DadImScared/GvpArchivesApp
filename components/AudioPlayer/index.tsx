import * as React from "react";
import { Animated, LayoutChangeEvent, LayoutRectangle, Platform, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Button } from "native-base";
import Ticker from "react-native-text-ticker";

import { audioPlayer } from "../../actions";
import { IReducerState } from "../../reducers";
import { AudioPlayerStateAndActions, getShowAudioPlayer, ShowPlayerStatus } from "../../reducers/audioPlayer";
import Icon from "../Icon";
import Audio from "./Audio";
import ButtonGroup from "./ButtonGroup";
import DurationSeeker from "./DurationSeeker";
import Title from "./Title";

const AnimatedView = Animated.View;
const alignCenter: any = { justifyContent: "center", alignItems: "center" };

const styles: any = StyleSheet.create({
  button: { width: 50, height: 20, ...alignCenter },
  wrapper: {
    ...alignCenter,
    alignSelf: "center",
    backgroundColor: "white",
    bottom: 0,
    flex: 1,
    padding: 8,
    paddingTop: 0,
    position: "absolute",
    width: "100%",
  }
});

interface IProps extends AudioPlayerStateAndActions<"setPlaying" | "setShowPlayer" | "showPlayer"> {}

interface IState {
  minimizedSliderLayout: LayoutRectangle;
  slideAnimation: Animated.Value;
  slideWrapperLayout: LayoutRectangle;
  playerOpacity: number;
  wrapperHeight: number;
}

export class AudioPlayer extends React.Component<IProps, IState> {

  marquee!: Ticker | null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      minimizedSliderLayout: { x: 0, y: 0, height: 0, width: 0 },
      playerOpacity: 0,
      slideAnimation: new Animated.Value(0),
      slideWrapperLayout: { x: 0, y: 0, height: 0, width: 0 },
      wrapperHeight: 0
    };
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    if (this.props.showPlayer !== prevProps.showPlayer) {
      this.runOpenCloseAnimation();
    }
  }

  animationConfig = () => ({
    [ShowPlayerStatus.OPEN]: {
      duration: 500,
      toValue: 0
    },
    [ShowPlayerStatus.CLOSED]: {
      duration: 500,
      toValue: this.state.wrapperHeight
    },
    [ShowPlayerStatus.MINIMIZED]: {
      duration: 500,
      toValue: this.state.wrapperHeight - 30
    }
  });

  runOpenCloseAnimation = () => {
    const { showPlayer, setPlaying } = this.props;
    Animated.timing(
      this.state.slideAnimation,
      this.animationConfig()[showPlayer]
    ).start(({ finished }) => {
      if (showPlayer === ShowPlayerStatus.CLOSED) {
        setPlaying(false);
      }
      if (finished && this.marquee) {
        if (showPlayer === ShowPlayerStatus.OPEN) {
          this.marquee.startAnimation();
        } else {
          this.marquee.stopAnimation();
        }
      }
    });
  };

  minimize = () => {
    const { setShowPlayer, showPlayer } = this.props;
    if (showPlayer === ShowPlayerStatus.MINIMIZED) {
      setShowPlayer(ShowPlayerStatus.OPEN);
    } else {
      setShowPlayer(ShowPlayerStatus.MINIMIZED);
    }
  };

  close = () => {
    this.props.setShowPlayer(ShowPlayerStatus.CLOSED);
  };

  onWrapperLayout = ({ nativeEvent: { layout: { height } } }: LayoutChangeEvent) => {
    // audio is hidden from start
    // this displays it after moving it into the correct position for slide animation
    if (this.state.wrapperHeight === 0) {
      this.state.slideAnimation.setValue(height);
      this.setState({ playerOpacity: 1 });
    }
    this.setState({ wrapperHeight: height });
  };

  onSlideWrapperLayout = ({ nativeEvent: { layout: slideWrapperLayout }}: LayoutChangeEvent) => {
    this.setState({ slideWrapperLayout });
  };

  onMinimizedSliderLayout = ({ nativeEvent: { layout: minimizedSliderLayout } }: LayoutChangeEvent) => {
    this.setState({ minimizedSliderLayout });
  };

  getIosTransform = (inputRange: number, otherDifference: number, scaleDifference: number) => {
    const { slideWrapperLayout } = this.state;
    return {
      transform: [
        {
          translateX: this.state.slideAnimation.interpolate({
            extrapolate: "clamp",
            inputRange: [0, 30],
            outputRange: [0, -(61)]
          })
        },
        { scaleX: this.state.slideAnimation.interpolate({
            extrapolate: "clamp",
            inputRange: [0, 30],
            outputRange: [1, otherDifference + 0.1]
          })
        },
        { scaleY: this.state.slideAnimation.interpolate({
            extrapolate: "clamp",
            inputRange: [0, inputRange],
            outputRange: [1, otherDifference + 0.02]
          })
        },
        {
          translateY: this.state.slideAnimation.interpolate({
            extrapolate: "clamp",
            inputRange: [0, inputRange - 0.1, inputRange],
            outputRange: [0, -slideWrapperLayout.y * scaleDifference - 15.8, -slideWrapperLayout.y * scaleDifference]
          })
        }
      ]
    };
  };

  getAndroidTransform = (inputRange: number, otherDifference: number, scaleDifference: number) => {
    const { slideWrapperLayout } = this.state;
    return {
      transform: [
        {
          translateX: this.state.slideAnimation.interpolate({
            extrapolate: "clamp",
            inputRange: [0, 30],
            outputRange: [0, -(63)]
          })
        },
        { scaleX: this.state.slideAnimation.interpolate({
            extrapolate: "clamp",
            inputRange: [0, 30],
            outputRange: [1, otherDifference]
          })
        },
        { scaleY: this.state.slideAnimation.interpolate({
            extrapolate: "clamp",
            inputRange: [0, inputRange],
            outputRange: [1, otherDifference]
          })
        },
        {
          translateY: this.state.slideAnimation.interpolate({
            extrapolate: "clamp",
            inputRange: [0, inputRange - 0.03, inputRange],
            outputRange: [0, -slideWrapperLayout.y * scaleDifference - (8.5 * otherDifference), -slideWrapperLayout.y]
          })
        }
      ]
    };
  };

  getTransform = (inputRange: number, otherDifference: number, scaleDifference: number) => {
    return (
      Platform.OS === "ios" ? this.getIosTransform : this.getAndroidTransform
    )(inputRange, otherDifference, scaleDifference);
  };

  animationRef = (el: any) => {
    this.marquee = el;
  };

  numberOrOne = (num: number) => num ? num : 1;

  getScaleDifference = () => {
    // Not sure if this is the correct way to do this
    const { slideWrapperLayout, minimizedSliderLayout } = this.state;
    let scaleDifference;
    let scaleDifferenceIn;
    if (Platform.OS === "ios") {
      const difference = (this.numberOrOne(slideWrapperLayout.width) / this.numberOrOne(minimizedSliderLayout.width));
      const scale = 2 - difference;
      scaleDifference = ((slideWrapperLayout.width || 1) / (minimizedSliderLayout.width - (scale * 100) || 1));
      scaleDifferenceIn = (minimizedSliderLayout.width - (scale * 100) || 1) / (slideWrapperLayout.width || 1);
    } else {
      scaleDifference = ((slideWrapperLayout.width || 1) / (minimizedSliderLayout.width - 35 || 1));
      scaleDifferenceIn = (minimizedSliderLayout.width - 35 || 1) / (slideWrapperLayout.width || 1);
    }
    return {
      scaleDifference,
      scaleDifferenceIn
    };
  };

  render() {
    const inputRange = (this.state.wrapperHeight || 50);
    const measure = this.getScaleDifference();
    return (
      <AnimatedView
        onLayout={this.onWrapperLayout}
        style={[
          styles.wrapper,
          { opacity: this.state.playerOpacity },
          { transform: [{ translateY: this.state.slideAnimation }] }
        ]}
      >
        <View style={{ flex: 1, flexDirection: "row-reverse", height: 30 }}>
          <View style={alignCenter}>
            <Button small={true} danger={true} onPress={this.close} style={styles.button}>
              <Icon style={{ height: 20 }} name={"close"} />
            </Button>
          </View>
          <View style={alignCenter}>
            <Button small={true} info={true} onPress={this.minimize} style={styles.button}>
              <Icon style={{ height: 20 }} name={"arrow-down"} />
            </Button>
          </View>
          <View
            onLayout={this.onMinimizedSliderLayout}
            style={{ flex: 1 }}
          />
        </View>
        <Audio />
        <Title
          ref={this.animationRef}
          style={{
            opacity: this.state.slideAnimation.interpolate({
              inputRange: [0, 30],
              outputRange: [1, 0]
            })
          }}
        />
        <AnimatedView
          style={{
            alignItems: "center",
            ...this.getTransform(inputRange, measure.scaleDifferenceIn, measure.scaleDifference),
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%"
          }}
          onLayout={this.onSlideWrapperLayout}
        >
          <DurationSeeker />
        </AnimatedView>
        <ButtonGroup/>
      </AnimatedView>
    );
  }
}

const mapStateToProps = (state: IReducerState) => getShowAudioPlayer(state);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPlaying: (playing: boolean) => dispatch(audioPlayer.setPlaying(playing)),
  setShowPlayer: (status: ShowPlayerStatus) => dispatch(audioPlayer.setShowPlayer(status))
});
export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer) as React.ComponentType;
