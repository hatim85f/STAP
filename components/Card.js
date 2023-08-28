import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const Card = (props) => {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "#6a6b6c",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
    borderColor: Colors.primary,
    borderRadius: 25,
    borderWidth: 5,
    backgroundColor: "white",
  },
});

export default Card;
