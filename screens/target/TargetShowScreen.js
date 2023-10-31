import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";

const TargetShowScreen = (props) => {
  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      <Text style={styles.header}>TargetShowScreen Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
});

export const TargetShowScreenOptions = (navData) => {
  return {
    headerTitle: "TargetShowScreen",
  };
};

export default TargetShowScreen;
