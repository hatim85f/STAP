import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import MenuButton from "../../components/webComponents/menu/MenuButton";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import TopBar from "./TopBar";

const MainSalesScreen = (props) => {
  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <TopBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {},
});

export const MainSalesScreenOptions = (navData) => {
  return {
    headerTitle: "MainSalesScreen",
  };
};

export default MainSalesScreen;
