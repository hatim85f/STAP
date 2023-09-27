import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AppHomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default AppHomeScreen;
