import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "./TopBar";
import MenuButton from "../../components/webComponents/menu/MenuButton";

const ContributeSalesScreen = (props) => {
  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <TopBar />
      <Text style={styles.header}>ContributeSalesScreen Screen</Text>
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

export const ContributeSalesScreenOptions = (navData) => {
  return {
    headerTitle: "ContributeSalesScreen",
  };
};

export default ContributeSalesScreen;
