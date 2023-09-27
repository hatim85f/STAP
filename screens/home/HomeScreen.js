import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Platform } from "react-native";
import WebHomeScreen from "../webScreens/home/WebHomeScreen";
import AppHomeScreen from "../appScreens/home/AppHomeScreen";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HomeScreen = (props) => {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      props.navigation.navigate("Main");
    }
  }, [token]);

  console.log(token);

  if (Platform.OS === "web") {
    return <WebHomeScreen navigation={props.navigation} />;
  } else {
    return <AppHomeScreen navigation={props.navigation} />;
  }
};

export default HomeScreen;

const styles = StyleSheet.create({});
