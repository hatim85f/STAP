import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// inputs container is the container which gives the main color with transparency 0.18
// should wrap all input in case of authentication
const InputsContainer = (props) => {
  return (
    <View style={{ ...styles.inputsContainer, ...props.style }}>
      <View style={styles.inputsHolder}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    width: wp("30%"),
    alignSelf: "center",
    maxHeight: hp("70%"),
  },
  inputsHolder: {
    backgroundColor: "rgba(135, 0, 243, 0.18)",
    padding: wp("1%"),
    borderRadius: 50,
    alignItems: "center",
  },
});

export default InputsContainer;
