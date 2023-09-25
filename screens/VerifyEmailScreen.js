import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import WebVerifyEmail from "../components/verification/WebVerifyEmail";
import { isWeb, isPhone, isTablet } from "../constants/device";
import AppVerifyEmail from "../components/verification/AppVerifyEmail";

const VerifyEmailScreen = (props) => {
  if (isWeb()) {
    return <WebVerifyEmail navigation={props.navigation} />;
  } else {
    return <AppVerifyEmail navigation={props.navigation} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {},
});

export const VerifyEmailScreenOptions = (navData) => {
  return {
    headerTitle: "VerifyEmailScreen",
  };
};

export default VerifyEmailScreen;
