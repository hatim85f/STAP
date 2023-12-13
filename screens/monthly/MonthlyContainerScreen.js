import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import TabBarNavigator from "../../components/tabBar/TabBarNavigator";

const MonthlyContainerScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MonthlyContainerScreen Screen</Text>
      <TabBarNavigator route="monthly-container" flex={1} />
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

export default MonthlyContainerScreen;
