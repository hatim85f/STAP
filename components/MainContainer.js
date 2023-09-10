import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

const MainContainer = (props) => {
  return <View style={styles.innerContainer}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    height: "92%",
    width: Platform.OS === "web" ? "60%" : "100%",
    alignSelf: "center",
    // marginTop: "0.5%",
    borderRadius: 15,
    borderColor: "#6a6b6c",
    borderWidth: Platform.OS === "web" ? 1 : 0,
  },
});

export default MainContainer;
