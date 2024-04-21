import { Easing, StyleSheet, Pressable, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

import { Entypo } from "@expo/vector-icons";

const Chevron = (props) => {
  const { open, close, setIndex, nextAnimation } = props;
  const rotationRef = useRef(new Animated.Value(0)).current;

  const rotationInterpolate = rotationRef.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "180deg"],
  });

  useEffect(() => {
    if (open) {
      console.log("open ");
      Animated.timing(rotationRef, {
        toValue: 360,
        duration: 750,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else if (close) {
      Animated.timing(rotationRef, {
        toValue: 0,
        duration: 750,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [open, close, rotationRef]);

  const callPress = () => {
    // nextAnimation();
    setIndex();
  };

  return (
    <Pressable onPress={callPress}>
      <Animated.View style={{ transform: [{ rotate: rotationInterpolate }] }}>
        <Entypo name="chevron-small-down" size={30} color="black" />
      </Animated.View>
    </Pressable>
  );
};

export default Chevron;
