import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

const IndividualOverview = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>IndividualOverview Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
});

export const IndividualOverviewOptions = (navData) => {
  return {
    headerTitle: "IndividualOverview",
  };
};

export default IndividualOverview;
