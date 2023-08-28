import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";

const Loader = (props) => {
  return (
    <View
      style={[
        styles.centeredView,
        props.center && {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <ActivityIndicator color={Colors.primary} size={"large"} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    height: hp("50%"),
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
