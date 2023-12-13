import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

const CustomSwiper = (props) => {
  const [direction, setDirection] = useState(null);

  const { changeDirection, list, index, width } = props;

  const position = useRef(new Animated.Value(0)).current;

  const opacity = position.interpolate({
    inputRange: [-globalWidth("48%"), 0, globalWidth("48%")],
    outputRange: [0, 1, 0],
  });

  const scale = position.interpolate({
    inputRange: [-globalWidth("48%"), 0, globalWidth("48%")],
    outputRange: [0.8, 1, 0.8],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState.dx);
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log(gestureState.dx);

        // Define a threshold for horizontal movement
        const threshold = 50;

        // Check if the horizontal movement is greater than the threshold
        if (gestureState.dx > threshold) {
          // Perform action for a right swipe
          console.log("Right Swipe");
          changeDirection("right");
        } else if (gestureState.dx < -threshold) {
          // Perform action for a left swipe
          console.log("Left Swipe");
          changeDirection("left");
        }
      },
    })
  ).current;

  return (
    <View style={styles.swiperContainer} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.swiperItem,
          { width: globalWidth("48%"), opacity, transform: [{ scale }] },
        ]}
      >
        {props.children}
        <View style={styles.btnRow}>
          {index !== 0 ? (
            <TouchableOpacity onPress={() => changeDirection("left")}>
              <Text style={styles.prev}>Prev</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 50 }} />
          )}
          {index !== list.length - 1 ? (
            <TouchableOpacity onPress={() => changeDirection("right")}>
              <Text style={styles.next}>Next</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 50 }} />
          )}
        </View>
        <View style={styles.dotContainer}>
          {list.map((item, i) => {
            return (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    flex: 1,
    flexDirection: "row",
    minHeight: globalHeight("70%"),
    width: "80%",
    alignSelf: "center",
  },
  swiperItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeDot: {
    backgroundColor: Colors.primary,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  inactiveDot: {
    backgroundColor: Colors.haizyColor,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  dotContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
  },
  dot: {
    margin: 5,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 50,
  },
  prev: {
    color: Colors.font,
    fontSize: globalWidth("1%"),
    fontFamily: "headers",
  },
  next: {
    color: Colors.primary,
    fontSize: globalWidth("1%"),
    fontFamily: "headers",
  },
});

export const CustomSwiperOptions = (navData) => {
  return {
    headerTitle: "CustomSwiper",
  };
};

export default CustomSwiper;
