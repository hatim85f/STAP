import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ImageBackground } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Card from "../components/Card";
import { Image } from "react-native";
import * as Progress from "react-native-progress";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../store/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Platform } from "react-native";

const SplashScreen = (props) => {
  const [progress, setProgress] = useState(0);

  const { isLoggedIn } = useSelector((state) => state.auth);

  console.log(isLoggedIn, Platform.OS, "splash screen");

  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(1); // Set progress to 100% after 3 seconds

      const fetchUserDetails = async () => {
        try {
          let storedUserDetails;
          if (Platform.OS === "web") {
            storedUserDetails = window.localStorage.getItem("userDetails");
          } else {
            storedUserDetails = await AsyncStorage.getItem("userDetails");
          }
          if (storedUserDetails) {
            const parsedUserDetails = JSON.parse(storedUserDetails);

            if (progress === 1) {
              dispatch(authActions.getUserIn(parsedUserDetails));
              console.log(parsedUserDetails.user, "parsedUserDetails");
              props.navigation.navigate("Home");
            }
          } else {
            if (progress === 1) {
              props.navigation.navigate("Login");
            }
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }, 3000);

    return () => {
      clearTimeout(timeout); // Clear the timeout when the component unmounts
    };
  }, [progress, dispatch]);

  useEffect(() => {}, []);

  // if (Platform.OS !== "web") {
  //   return <View style={{ flex: 1, backgroundColor: "white" }}></View>;
  // }

  if (Platform.OS !== "web") {
    return (
      <View style={styles.container}>
        <Card style={[styles.innerContainer, { backgroundColor: "white" }]}>
          <Image
            source={require("../assets/vectors/logo_gif.gif")}
            style={[styles.gif, { height: hp("20%"), width: hp("20%") }]}
          />
          <Progress.Bar
            progress={progress}
            width={hp("40%")}
            height={hp("1.5%")}
            color={Colors.primary}
            style={{ borderRadius: 50, borderWidth: 0, marginTop: hp("1.5%") }}
          />
        </Card>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/bg.jpeg")}
      style={styles.container}
    >
      <Card style={styles.innerContainer}>
        <Image
          source={require("../assets/vectors/logo_gif.gif")}
          style={styles.gif}
        />
        <Progress.Bar
          progress={progress}
          width={hp("80%")}
          height={hp("1.5%")}
          color={Colors.primary}
          style={{ borderRadius: 50, borderWidth: 0, marginTop: hp("1.5%") }}
        />
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: wp("95%"),
    height: hp("95%"),
    backgroundColor: "rgba(232, 232, 232, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    height: hp("40%"),
    width: hp("40%"),
    borderRadius: 25,
  },
});

export default SplashScreen;
