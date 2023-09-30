import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { height, width } from "../../../constants/dimensions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MainHome from "../../../screens/mainHome/MainHome";
import HomePageIcon from "../../HomePageIcon";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";
import { isPhone, isTablet, isWeb } from "../../../constants/device";

// still here we need to pass the url for social medica accounts

const RightContainer = (props) => {
  return (
    <View style={styles.rightView}>
      <View style={styles.mainContainer}>
        <View style={styles.buttonsRow}>
          <HomePageIcon
            icon="docs"
            title="Documentations"
            navigation={props.navigation}
            route="Documentation"
          />
          <HomePageIcon
            icon="about"
            title="About STAP™"
            navigation={props.navigation}
            route="About"
          />
          <HomePageIcon
            icon="why"
            title="Why STAP™ ?"
            navigation={props.navigation}
            route="Why STAP™"
          />
          <HomePageIcon
            icon="price"
            title="Pricing"
            navigation={props.navigation}
            route="Pricing"
          />
          <HomePageIcon
            icon="info"
            title="Developers"
            navigation={props.navigation}
            route="Developers"
          />
          <HomePageIcon
            icon="request"
            title="Request Demo"
            navigation={props.navigation}
            route="Request"
          />
        </View>
        <View style={styles.appLinks}>
          <TouchableOpacity onPress={() => {}} style={styles.linkItem}>
            <Image
              source={require("../../../assets/vectors/google.png")}
              style={styles.links}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.linkItem}>
            <Image
              source={require("../../../assets/vectors/apple.png")}
              style={styles.links}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    paddingLeft: 10,
    // justifyContent: "flex-end",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: globalHeight("15%"),
    marginLeft: globalWidth("5%"),
  },
  appLinks: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: isWeb() ? globalWidth("25%") : globalWidth("100%"),
    alignSelf: "center",
    marginTop: isWeb() ? globalHeight("10%") : globalHeight("2%"),
  },
  links: {
    height: isTablet()
      ? globalHeight("5%")
      : isPhone()
      ? globalHeight("3%")
      : globalHeight("8%"),
    width: isTablet()
      ? globalWidth("15%")
      : isPhone()
      ? globalWidth("22%")
      : globalWidth("12%"),
    borderRadius: 10,
    marginHorizontal: globalWidth("2%"),
  },

  icon: {
    height: wp("2%"),
    width: wp("2%"),
  },
  rightIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: hp("30%"),
    width: "50%",
    flex: 1,
    alignItems: "flex-end",
  },
});

export default RightContainer;
