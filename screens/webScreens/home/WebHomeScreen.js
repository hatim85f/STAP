import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";
import { Link, useLinkTo, useNavigation } from "@react-navigation/native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import MenuButton from "../../../components/webComponents/menu/MenuButton";
const WebHomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <Text style={styles.header}>WebHomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 40,
  },
});

// export const webHomeScreenOptions = (navData) => {
//   return {
//     headerLeft: () => {
//       return <MenuButton navigation={navData.navigation} />;
//     },
//   };
// };

export default WebHomeScreen;
