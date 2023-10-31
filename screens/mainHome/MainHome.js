import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { Avatar, Button, SocialIcon } from "react-native-elements";
import { globalWidth, globalHeight } from "../../constants/globalWidth";
import HomePageIcon from "../../components/HomePageIcon";
import SocialIcons from "../../components/SocialIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import { isPhone, isTablet, isWeb } from "../../constants/device";
import { Platform } from "react-native";
import Colors from "../../constants/Colors";

const MainHome = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")}
        style={styles.image}
        resizeMode="cover"
        imageStyle={{ opacity: 0.6 }}
      >
        <View style={styles.overlay}>
          <View style={styles.lastRow}>
            <View style={styles.header}>
              <Image
                source={require("../../assets/icon.png")}
                diso
                style={styles.icon}
              />
            </View>
          </View>
          {Platform.OS === "web" && (
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
          )}
          <View style={styles.appLinks}>
            <Pressable onPress={() => {}} style={styles.linkItem}>
              <Image
                source={require("../../assets/vectors/google.png")}
                style={styles.links}
              />
            </Pressable>
            <Pressable onPress={() => {}} style={styles.linkItem}>
              <Image
                source={require("../../assets/vectors/apple.png")}
                style={styles.links}
              />
            </Pressable>
          </View>
          <Button
            title="Login or Signup"
            onPress={() => props.navigation.navigate("Login")}
            buttonStyle={styles.button}
            titleStyle={styles.title}
          />

          <View style={styles.social}>
            <SocialIcons icon="facebook" />
            <SocialIcons icon="instagram" />
            <SocialIcons icon="linkedin" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // overflow: "scroll",
  },
  header: {},
  image: {
    width: globalWidth("100%"),
    height: globalHeight("100%"),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  lastRow: {
    flexDirection: isWeb() ? "row" : "column",
    justifyContent: isWeb() ? "space-between" : "center",
    alignItems: "center",
    width: globalWidth("100%"),
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    alignContent: "center",
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
  icon: {
    height: isTablet()
      ? globalHeight("10%")
      : isPhone()
      ? globalHeight("8%")
      : globalHeight("20%"),
    width: isTablet()
      ? globalWidth("10%")
      : isPhone()
      ? globalWidth("18%")
      : globalWidth("10%"),
    marginTop: isWeb() ? 0 : globalHeight("5%"),
    marginBottom: 15,
    marginLeft: isWeb() ? globalWidth("5%") : globalWidth("4%"),
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
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    width: globalWidth("80%"),
    alignSelf: "center",
    marginTop: isWeb() ? globalHeight("12%") : globalHeight("6%"),
  },
  social: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: globalWidth("5%"),
    marginTop: globalWidth("5%"),
    bottom: 5,
    // make it stick to the end of the page
    position: "absolute",
  },
  button: {
    backgroundColor: "white",
    width: isWeb() ? globalWidth("15%") : globalWidth("40%"),
    alignSelf: "center",
    marginTop: isWeb() ? globalHeight("5%") : globalHeight("2%"),
    borderRadius: 10,
  },
  title: {
    color: Colors.primary,
    fontSize: isWeb() ? globalWidth("1.5%") : globalWidth("2.5%"),
  },
});

export default MainHome;
