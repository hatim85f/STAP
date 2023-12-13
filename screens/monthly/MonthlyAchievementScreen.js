import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

const MonthlyAchievementScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MonthlyAchievementScreen Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
});

export const MonthlyAchievementScreenOptions = (navData) => {
  return {
    headerTitle: "MonthlyAchievementScreen",
  };
};

export default MonthlyAchievementScreen;
