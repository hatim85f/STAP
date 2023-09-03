import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

const BackButton = (props) => {
  const { route } = props;
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate(route)}
      style={styles.touchable}
    >
      <AntDesign name="arrowleft" size={35} color={Colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginLeft: 10,
    cursor: "pointer",
    marginTop: 5,
  },
});

export default BackButton;
