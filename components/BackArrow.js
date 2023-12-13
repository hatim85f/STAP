import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const BackArrow = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.goBack()}
    >
      <AntDesign name="arrowleft" size={24} color={Colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {},
});

export const BackArrowOptions = (navData) => {
  return {
    headerTitle: "BackArrow",
  };
};

export default BackArrow;
