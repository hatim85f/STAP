import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalHeight } from "../constants/globalWidth";
import Colors from "../constants/Colors";

const HeaderText = (props) => {
  return <Text style={styles.header}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontSize: globalHeight("2.5%"),
    fontWeight: "bold",
    color: "#000",
    fontFamily: "headers",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: globalHeight("2%"),
  },
});

export default HeaderText;
