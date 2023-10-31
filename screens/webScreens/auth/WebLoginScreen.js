import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Animated,
  Easing,
} from "react-native";
import { height, width } from "../../../constants/dimensions";
import Colors from "../../../constants/Colors";
import { Button } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import LoginItem from "../../../components/webComponents/auth/LoginItem";
import RightContainer from "../../../components/webComponents/auth/RightContainer";
import RegisterationComponent from "../../../components/webComponents/auth/RegisterationComponent";
import { EasingNode } from "react-native-reanimated";
import ForgotPassword from "../../../components/webComponents/auth/ForgotPassword";

const WebLoginScreen = (props) => {
  // ========================================================ANIMATION============================================

  const registerationHeight = useRef(new Animated.Value(hp("100%"))).current; // value is hp('100%')
  const loginHeight = useRef(new Animated.Value(hp("15%"))).current;
  const loginWidth = useRef(new Animated.Value(0)).current; // value is 0
  const forgotXValue = useRef(new Animated.Value(-wp("100%"))).current; // needed value is -wp('100%')

  // animating registeration component in
  // animating login box out
  const animateRegisterationUp = () => {
    Animated.timing(loginHeight, {
      toValue: hp("100%"),
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      Animated.timing(registerationHeight, {
        toValue: hp("18%"),
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.bounce,
      }).start();
    });
  };

  // animating registeration component out
  // animating login box in
  const animteRegisterationDown = () => {
    Animated.timing(registerationHeight, {
      toValue: hp("100%"),
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      Animated.timing(loginHeight, {
        toValue: hp("15%"),
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.bounce,
      }).start();
    });
  };

  // animating forget password View in
  // animating login box out
  const animateForgetIn = () => {
    Animated.sequence([
      Animated.timing(loginWidth, {
        toValue: 50, // Move the element a bit to the right
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bezier(0.17, 0.67, 0.83, 0.67),
      }),
      Animated.timing(loginWidth, {
        toValue: -wp("100%"), // Fly the element out to the left
        duration: 800,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start(() => {
      Animated.timing(forgotXValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    });
  };

  // animating login box in
  // animating forgotPassword box out
  const returnLogin = () => {
    Animated.sequence([
      Animated.timing(forgotXValue, {
        toValue: 50, // Move the element a bit to the right
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bezier(0.17, 0.67, 0.83, 0.67),
      }),
      Animated.timing(forgotXValue, {
        toValue: -wp("100%"), // Fly the element out to the left
        duration: 800,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start(() => {
      Animated.timing(loginWidth, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/bg.jpeg")}
        style={styles.bg}
      >
        <View style={styles.overlay}>
          <View style={styles.mainRow}>
            <View style={styles.leftView}>
              <View style={styles.topRow}>
                <Image
                  source={require("../../../assets/icon.png")}
                  style={styles.logo}
                />
                <View style={styles.buttonsRow}>
                  <Button
                    title="ABOUT"
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    onPress={() => {}}
                  />
                  <Button
                    title="REQUEST DEMO"
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    onPress={() => {}}
                  />
                </View>
              </View>
              <Image
                source={require("../../../assets/vectors/leftCircle.png")}
                style={{ ...styles.vector, ...{ marginLeft: -10 } }}
              />
              <Animated.View
                style={[
                  styles.loginContainer,
                  {
                    transform: [
                      { translateY: loginHeight },
                      { translateX: loginWidth },
                    ],
                  },
                ]}
              >
                <LoginItem
                  animateRegisterationUp={animateRegisterationUp}
                  animateForgetIn={animateForgetIn}
                  navigation={props.navigation}
                />
              </Animated.View>
              <Animated.View
                style={[
                  styles.loginContainer,
                  { transform: [{ translateX: forgotXValue }] },
                ]}
              >
                <AntDesign
                  name="close"
                  size={35}
                  color={Colors.primary}
                  onPress={returnLogin}
                  style={{
                    fontSize: wp("1.6%"),
                    fontWeight: "bold",
                    marginLeft: 15,
                  }}
                />
                <ForgotPassword returnLogin={returnLogin} />
              </Animated.View>

              <View style={styles.circleContainer}>
                <Image
                  source={require("../../../assets/vectors/rightCircle.png")}
                  style={{
                    ...styles.vector,
                    ...{ marginRight: -wp("0.3%"), zIndex: -500 },
                  }}
                />
              </View>
              <Animated.View
                style={[
                  styles.registerationView,
                  { transform: [{ translateY: registerationHeight }] },
                ]}
              >
                <RegisterationComponent
                  animteRegisterationDown={animteRegisterationDown}
                />
              </Animated.View>
            </View>
            <RightContainer navigation={props.navigation} />
          </View>
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
    width,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  leftView: {
    height: height - 20,
    width: wp("44%"),
    marginTop: hp("1%"),
    backgroundColor: "rgba(232, 232, 232, 0.6)",
    borderRadius: 83,
    borderColor: Colors.primary,
    borderWidth: 10,
    padding: 5,
    marginLeft: -wp("3%"),
  },
  logo: {
    height: hp("18%"),
    width: hp("18%"),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonsRow: {
    width: wp("20%"),
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "transaparent",
  },
  buttonTitle: {
    color: Colors.font,
    fontFamily: "headers",
    fontWeight: "bold",
  },
  vector: {
    width: wp("5.3%"),
    height: hp("19%"),
  },

  circleContainer: {
    alignItems: "flex-end",
    zIndex: -500,
    position: "fixed",
    bottom: hp("20%"),
    right: wp("55.3%"),
  },

  registerationView: {
    position: "fixed",
    alignSelf: "center",
  },
  loginContainer: {
    position: "fixed",
    alignSelf: "center",
    top: hp("30%"),
  },
  forgotText: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: wp("1%"),
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },
  topContainer: {
    cursor: "pointer",
    width: wp("30%"),
    alignSelf: "center",
    marginLeft: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});

export default WebLoginScreen;
