import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button, SocialIcon } from "react-native-elements";
import { fontSize, iconSize } from "../constants/sizes";
import { globalWidth } from "../constants/globalWidth";
import Colors from "../constants/Colors";

const SocialIcons = (props) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePress = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SocialIcon
      type={props.icon}
      onPress={handlePress}
      size={75}
      style={isPressed && buttonPressed}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.5)",
    width: globalWidth("12%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    cursor: "pointer",
    padding: 10,
  },
  buttonPressed: {
    boxShadow: "0 0px #666",
    transform: "translateY(4px)",
  },
  text: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: fontSize(),
    fontWeight: "bold",
  },
});

export default SocialIcons;
