import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { height, width } from "../../../constants/dimensions";

const InputsContainer = (props) => {
  return (
    <View style={{ ...styles.inputsContainer, ...props.style }}>
      <View style={styles.inputsHolder}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    width: width * 0.8,
    alignSelf: "center",
    maxHeight: height * 0.7,
  },
  inputsHolder: {
    backgroundColor: "rgba(135, 0, 243, 0.18)",
    padding: width * 0.01,
    borderRadius: 30,
    alignItems: "center",
  },
});

export default InputsContainer;
