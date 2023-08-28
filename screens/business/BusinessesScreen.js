import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import Loader from "../../components/Loader";

const BusinessesScreen = (props) => {
  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      <Text>Business </Text>
      <Loader center />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
});

export default BusinessesScreen;
