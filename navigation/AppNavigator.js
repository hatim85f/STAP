import React, { useContext, useState, useEffect } from "react";
import {
  NavigationContainer,
  useRoute,
  useNavigationState,
} from "@react-navigation/native";
import { FullAppNavigator } from "./MainNaviagtor";
import { NavigationContext } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../store/auth/authActions";
import { Platform } from "react-native";
import { Alert } from "react-native";

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

const AppNavigator = () => {
  const [initialState, setInitialState] = useState();
  const [isReady, setIsReady] = useState(false);
  const navigationContext = useContext(NavigationContext);

  const { error, errorMessage } = useSelector((state) => state.auth);

  const prefix = Linking.createURL("stap://");

  const config = {
    screens: {
      Into: "intro",
      Login: "login",
      Home: {
        screens: {
          Dashboard: "dashboard",
          businesses: "businesses",
          add_businesses: "add_businesses",
        },
      },
    },
  };

  const linking = {
    prefixes: [prefix],
    config,
  };

  useEffect(() => {
    const restoreState = async () => {
      const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
      const state = savedStateString ? JSON.parse(savedStateString) : undefined;
      if (state !== undefined) {
        setInitialState(state);
      }
    };

    restoreState();
  }, []);

  // if (!isReady) {
  //   return <Loader />;
  // }

  const dispatch = useDispatch();

  useEffect(() => {
    if (error && Platform.OS !== "web") {
      Alert.alert(error, errorMessage, [
        { text: "Okay", onPress: () => dispatch(authActions.clearError()) },
      ]);
    }
  }, [error, errorMessage]);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      context={navigationContext}
      initialState={initialState}
      onStateChange={(state) => setInitialState(state)}
    >
      <FullAppNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
