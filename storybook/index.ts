import { configure, getStorybookUI } from "@storybook/react-native";
import { AppRegistry } from "react-native";

// @ts-ignore
import { Asset, Font, Icon } from "expo";
import "./addons";
import "./rn-addons";

// needed to load fonts for native base
const loadAssets = async () => {
  return Promise.all([
    Asset.loadAsync([
      require("../assets/images/robot-dev.png"),
      require("../assets/images/robot-prod.png"),
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

loadAssets();

// import stories
configure(() => {
  require("./stories");
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  host: "192.168.0.131", port: 7007
});

// Actually need to use this regardless of expo
// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent("krsna_us_app", () => StorybookUIRoot);

export default StorybookUIRoot;
