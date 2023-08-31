import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const MenuButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.toggleDrawer()}
      style={[props.style, { cursor: "pointer" }]}
    >
      <Ionicons
        name="menu"
        size={45}
        color={Colors.primary}
        style={{ marginLeft: wp("0.5%") }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default MenuButton;
