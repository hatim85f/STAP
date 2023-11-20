import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import TabBarNavigator from "../../components/tabBar/TabBarNavigator";

const IndividualSalesScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>IndividualSalesScreen Screen</Text>
      <TabBarNavigator route="individual-sales" />
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

export default IndividualSalesScreen;
