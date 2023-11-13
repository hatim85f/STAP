import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight } from "../constants/globalWidth";
import Colors from "../constants/Colors";

const AppLoader = (props) => {
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
      <Image
        source={require("../assets/vectors/logo_gif.gif")}
        style={styles.loader}
      />
      {props.loadingMessage && (
        <Text style={styles.message}> {props.loadingMessage} </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    height: globalHeight("50%"),
    flex: 1,
    backgroundColor: "white",
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
  loader: {
    height: globalHeight("25%"),
    width: globalHeight("25%"),
  },
});

export default AppLoader;
