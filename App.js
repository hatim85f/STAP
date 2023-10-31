import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import mainStore from "./store";
import AppNavigator from "./navigation/AppNavigator";
import ErrorModal from "./components/error/ErrorModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform, LogBox } from "react-native";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./constants/firebaseConfig";
// import { StripeProvider } from "@stripe/stripe-react-native";
import process from "process";

export default function App(props) {
  const [appIsReady, setAppIsReady] = useState(false);

  // Initialize Firebase
  initializeApp(firebaseConfig);

  useEffect(() => {
    const fetchFonts = async () => {
      LogBox.ignoreAllLogs();

      await Font.loadAsync({
        headers:
          Platform.OS === "web" || Platform.OS === "android"
            ? require("./assets/fonts/monts.ttf")
            : require("./assets/fonts/second.ttf"),
        numbers: require("./assets/fonts/numbers.ttf"),
        "open-sans": require("./assets/fonts/open.ttf"),
        highlight: require("./assets/fonts/highlight.ttf"),
        Courier: require("./assets/fonts/courier.ttf"),
      });
      setAppIsReady(true); // Set appIsReady to true after the font has loaded
    };

    fetchFonts();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={mainStore}>
          <AppNavigator />
          {Platform.OS === "web" && <ErrorModal />}
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
