import "@flyskywhy/react-native-browser-polyfill";
import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import App from "./App";
import { AppRegistry } from "react-native";

const appName = Constants.manifest.name;
AppRegistry.registerComponent(appName, () => App);
registerRootComponent(App);
