import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import TabBarNavigator from "../../components/tabBar/TabBarNavigator";

const IndividualAchievementScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>IndividualAchievementScreen Screen</Text>
      <TabBarNavigator route="individual-achievement" />
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

export const IndividualAchievementScreenOptions = (navData) => {
  return {
    headerTitle: "IndividualAchievementScreen",
  };
};

export default IndividualAchievementScreen;
