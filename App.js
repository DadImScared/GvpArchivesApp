import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View, YellowBox} from 'react-native';
YellowBox.ignoreWarnings([ "Require cycle:", "" ]);
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { enableBatching } from "redux-batched-actions";
import thunk from "redux-thunk";
import reducers from "./reducers"
import AudioPlayer from "./components/AudioPlayer";
import { callApiMiddleware } from "./callApiMiddleware";
// used when storybook is active
import Storybook from "./storybook";

const store = createStore(
  enableBatching(reducers),
  compose(
    applyMiddleware(thunk, callApiMiddleware)
  )
);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    // uncomment to show story book
    // return <Storybook/>;
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
            <AudioPlayer />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
