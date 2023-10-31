import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
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
          backgroundColor: "#fff",
        },
      ]}
    >
      <ActivityIndicator color={Colors.primary} size={"large"} />
      {props.message && <Text style={styles.message}>Processing Payment</Text>}
      {props.loadingMessage && (
        <Text style={styles.message}>{props.loadingMessage}</Text>
      )}
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
  message: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "headers",
    color: Colors.font,
  },
});

export default Loader;
