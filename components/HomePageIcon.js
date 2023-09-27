import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { fontSize, iconSize } from "../constants/sizes";
import { globalHeight, globalWidth } from "../constants/globalWidth";
import Colors from "../constants/Colors";
import { isPhone, isTablet, isWeb } from "../constants/device";
import { Platform } from "react-native";

const HomePageIcon = (props) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePress = async () => {
    try {
      setTimeout(() => {
        props.navigation.navigate(props.route);
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  const iconNumber = 3;
  const icons = {
    docs: require("../assets/vectors/docs.png"),
    about: require("../assets/vectors/about.png"),
    why: require("../assets/vectors/why.png"),
    price: require("../assets/vectors/price.png"),
    info: require("../assets/vectors/info.png"),
    request: require("../assets/vectors/request.png"),
  };
  const iconSource = icons[props.icon];

  return (
    <TouchableOpacity
      style={[styles.container, isPressed && styles.buttonPressed]}
      activeOpacity={1}
      onPress={handlePress}
      onPressIn={handleTouchStart}
      onPressOut={handleTouchEnd}
    >
      {Platform.OS === "web" ? (
        <Avatar source={iconSource} size={isPhone() ? 40 : 60} />
      ) : (
        <Image source={iconSource} style={styles.image} />
      )}

      <Text style={styles.text}> {props.title} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.6)",
    width: isWeb()
      ? globalWidth("12%")
      : isTablet()
      ? globalWidth("25%")
      : globalWidth("35%"),
    minHeight: isPhone() ? globalHeight("10%") : globalHeight("15%"),
    minWidth: isWeb()
      ? globalWidth("12%")
      : isTablet()
      ? globalWidth("25%")
      : globalWidth("35%"),
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
    marginVertical: 5,
  },
  buttonPressed: {
    boxShadow: "0 0px #666",
    transform: "translateY(4px)",
  },
  text: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: isPhone() ? 12 : globalHeight("2%"),
    fontWeight: "bold",
  },
  header: {},
});

export const HomePageIconOptions = (navData) => {
  return {
    headerTitle: "HomePageIcon",
  };
};

export default HomePageIcon;
