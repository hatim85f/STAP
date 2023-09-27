import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

const Pricing = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pricing Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
});

export const pricingPageOptions = (navData) => {
  return {
    headerTitle: "Pricing",
  };
};

export default Pricing;
