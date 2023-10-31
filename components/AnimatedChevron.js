import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { iconSizes } from "../constants/sizes";
import { useRef } from "react";

const AnimatedChevron = (props) => {
  const { isOpen } = props;
  const chevronRotation = useRef(new Animated.Value(0)).current;
  // animating chevron
  const chevronRotationInterpolated = chevronRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  useEffect(() => {
    Animated.timing(chevronRotation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View
      style={{
        justifyContent: "center",
        transform: [{ rotate: chevronRotationInterpolated }],
      }}
    >
      <Entypo
        name="chevron-small-right"
        size={iconSizes()}
        color={Colors.font}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
});

export const AnimatedChevronOptions = (navData) => {
  return {
    headerTitle: "AnimatedChevron",
  };
};

export default AnimatedChevron;
