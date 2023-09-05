import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";

const SettingsScreen = (props) => {
  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      <Text style={styles.header}>SettingsScreen Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {},
});

export default SettingsScreen;
