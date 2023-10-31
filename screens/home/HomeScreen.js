import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import Colors from "../../constants/Colors";

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <Text style={styles.header}>HomeScreen Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 40,
  },
});

export const HomeScreenOptions = (navData) => {
  return {
    headerTitle: "HomeScreen",
  };
};

export default HomeScreen;
