import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Platform } from "react-native";
import WebHomeScreen from "../webScreens/home/WebHomeScreen";
import AppHomeScreen from "../appScreens/home/AppHomeScreen";

const HomeScreen = (props) => {
  if (Platform.OS === "web") {
    return <WebHomeScreen navigation={props.navigation} />;
  } else {
    return <AppHomeScreen navigation={props.navigation} />;
  }
};

export default HomeScreen;

const styles = StyleSheet.create({});
