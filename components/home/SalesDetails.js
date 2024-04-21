import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

const SalesDetails = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>SalesDetails Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "28%",
    borderColor: "black",
    borderWidth: 1,
    padding: globalWidth("1%"),
    height: globalHeight("33%"),
    backgroundColor: "#FFFFF3",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopRightRadius: 10,
    paddingBottom: 0,
  },
  header: {},
});

export default SalesDetails;
