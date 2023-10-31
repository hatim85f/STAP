import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";

const BackButton = (props) => {
  const { route } = props;
  return (
    <Pressable
      onPress={() => props.navigation.navigate(route)}
      style={styles.touchable}
    >
      <AntDesign name="arrowleft" size={35} color={Colors.primary} />
    </Pressable>
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
