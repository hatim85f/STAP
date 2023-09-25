import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { Button } from "react-native-elements";

import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { height, width } from "../../constants/dimensions";
import Colors from "../../constants/Colors";
import RightContainer from "../webComponents/auth/RightContainer";
import WebVerifyComponent from "./WebVerifyComponent";

const WebVerifyEmail = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")}
        style={styles.bg}
      >
        <View style={styles.mainRow}>
          <View style={styles.leftView}>
            <View style={styles.topRow}>
              <Image
                source={require("../../assets/icon.png")}
                style={styles.logo}
              />
            </View>
            <Image
              source={require("../../assets/vectors/leftCircle.png")}
              style={{ ...styles.vector, ...{ marginLeft: -10 } }}
            />
            <View style={[styles.loginContainer]}>
              <Image
                source={require("../../assets/vectors/merged.png")}
                style={styles.logoCenter}
              />
            </View>

            <View style={styles.circleContainer}>
              <Image
                source={require("../../assets/vectors/rightCircle.png")}
                style={{
                  ...styles.vector,
                  ...{ marginRight: -globalWidth("0.3%"), zIndex: -500 },
                }}
              />
            </View>
            <WebVerifyComponent navigation={props.navigation} />
          </View>
          <RightContainer />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    height: height,
    width: width,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  leftView: {
    height: height - 20,
    width: globalWidth("44%"),
    marginTop: globalHeight("1%"),
    backgroundColor: "rgba(232, 232, 232, 0.6)",
    borderRadius: 83,
    borderColor: Colors.primary,
    borderWidth: 10,
    padding: 5,
    marginLeft: -globalWidth("3%"),
  },
  logo: {
    height: globalHeight("18%"),
    width: globalHeight("18%"),
  },
  vector: {
    width: globalWidth("5.3%"),
    height: globalHeight("19%"),
  },

  circleContainer: {
    alignItems: "flex-end",
    zIndex: -500,
    position: "fixed",
    bottom: globalHeight("20%"),
    right: globalWidth("55.3%"),
  },
  loginContainer: {
    position: "fixed",
    alignSelf: "center",
    top: globalHeight("30%"),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const WebVerifyEmailOptions = (navData) => {
  return {
    headerTitle: "WebVerifyEmail",
  };
};

export default WebVerifyEmail;
