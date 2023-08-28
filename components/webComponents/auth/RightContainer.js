import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { height, width } from "../../../constants/dimensions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// still here we need to pass the url for social medica accounts

const RightContainer = () => {
  return (
    <View style={styles.rightView}>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={() => {}} style={{ cursor: "pointer" }}>
          <Image
            source={require("../../../assets/vectors/Facebook.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ cursor: "pointer" }}>
          <Image
            source={require("../../../assets/vectors/WhatsApp.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ cursor: "pointer" }}>
          <Image
            source={require("../../../assets/vectors/Instagram.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ cursor: "pointer" }}>
          <Image
            source={require("../../../assets/vectors/Twitter.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ cursor: "pointer" }}>
          <FontAwesome5 name="tiktok" size={wp("1.8%")} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightView: {
    height: height - 20,
    width: "50%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  icon: {
    height: wp("2%"),
    width: wp("2%"),
  },
  rightIcons: {
    justifyContent: "space-around",
    height: hp("30%"),
  },
});

export default RightContainer;
