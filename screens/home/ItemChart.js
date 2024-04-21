import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

const ItemChart = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ItemChart Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
});

export const ItemChartOptions = (navData) => {
  return {
    headerTitle: "ItemChart",
  };
};

export default ItemChart;
