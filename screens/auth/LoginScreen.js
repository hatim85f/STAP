import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Platform } from "react-native";
import WebLoginScreen from "../webScreens/auth/WebLoginScreen";
import AppLoginScreen from "../appScreens/auth/AppLoginScreen";
import { isWeb } from "../../constants/device";

const LoginScreen = (props) => {
  const patform = Platform.OS;

  if (isWeb()) {
    return <WebLoginScreen navigation={props.navigation} />;
  } else {
    return <AppLoginScreen navigation={props.navigation} />;
  }
};

const styles = StyleSheet.create({});

export default LoginScreen;
