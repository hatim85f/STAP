import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/auth/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Progress from "react-native-progress";
import Colors from "../constants/Colors";
import { isPhone, isWeb } from "../constants/device";
import Card from "../components/Card";
import { useHistory } from "react-router-dom";
import { Button } from "react-native-elements";

const SplashScreen = (props) => {
  const [progress, setProgress] = useState(0);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [canNavigate, setCanNavigate] = useState(false);
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

          const parsedUserDetails = JSON.parse(storedUserDetails);

          if (parsedUserDetails.token) {
            dispatch(authActions.getUserIn(parsedUserDetails));

            const { user } = parsedUserDetails;

            if (!user.emailVerified) {
              window.location.href = "/verify_email_address";
            } else {
              props.navigation.navigate("Home");
            }
          } else {
            if (!isLoggedIn) {
              props.navigation.navigate("Main"); // Navigate to the "Login" page
            }
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      setCanNavigate(true);

      fetchUserDetails();
    }, 3000);

    return () => {
      clearTimeout(timeout); // Clear the timeout when the component unmounts
    };
  }, [dispatch, isLoggedIn, props.navigation]);

  useEffect(() => {
    if (progress === 1) {
      if (isLoggedIn && canNavigate) {
        props.navigation.navigate("Home");
      } else if (canNavigate && !isLoggedIn) {
        if (Platform.OS === "web") {
          props.navigation.navigate("Main");
        } else {
          props.navigation.navigate("Main");
        }
      }
    }
  }, [canNavigate, props.navigation, progress, isLoggedIn]);

  return (
    <View style={styles.container}>
      {Platform.OS !== "web" ? (
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
              style={{
                borderRadius: 50,
                borderWidth: 0,
                marginTop: hp("1.5%"),
              }}
            />
          </Card>
        </View>
      ) : (
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
              style={{
                borderRadius: 50,
                borderWidth: 0,
                marginTop: hp("1.5%"),
              }}
            />
          </Card>
        </ImageBackground>
      )}
    </View>
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
