import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { height, width } from "../../../constants/dimensions";
import Colors from "../../../constants/Colors";
import * as LocalAuthentication from "expo-local-authentication";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import LoginItem from "../../../components/appComponents/auth/LoginItem";
import RegisterationComponent from "../../../components/appComponents/auth/RegisterationComponent";
import ForgotPassword from "../../../components/appComponents/auth/ForgotPassword";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../../../store/auth/authActions";
import { useDispatch } from "react-redux";
import Loader from "../../../components/Loader";

const AppLoginScreen = (props) => {
  const registerationHeight = useRef(new Animated.Value(hp("100%"))).current; // value is hp('100%')
  const loginHeight = useRef(new Animated.Value(-30)).current;
  const loginWidth = useRef(new Animated.Value(0)).current; // value is 0
  const forgotXValue = useRef(new Animated.Value(-hp("150%"))).current; // needed value is -wp('100%')
  const logoScale = useRef(new Animated.Value(1)).current;

  const [biometricStatus, setBiometricStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        toValue: hp("30%"),
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
        toValue: -30,
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
      Animated.timing(logoScale, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.circle,
      }).start(() => {
        Animated.timing(forgotXValue, {
          toValue: 10,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bounce,
        }).start();
      });
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
        toValue: -hp("150%"), // Fly the element out to the left
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
      }).start(() => {
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.circle,
        }).start();
      });
    });
  };

  const dispatch = useDispatch();

  // login using biometric login
  const handleBiometricLogin = async () => {
    const supported =
      (await LocalAuthentication.hasHardwareAsync()) &&
      (await LocalAuthentication.isEnrolledAsync());

    if (supported) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with your fingerprint or face.",
      });

      if (result.success) {
        // Biometric authentication successful
        setBiometricStatus("Biometric authentication successful!");
        // You can navigate the user to their account screen or perform other actions here.
        // Replace 'Home' with the actual route name for the user's account screen

        const userBiometrics = await AsyncStorage.getItem("biometric_details");
        console.log(userBiometrics, "ddd");
        setIsLoading(true);
        dispatch(authActions.biometricLogin(userBiometrics)).then(() => {
          setIsLoading(false);
        });
      } else {
        setBiometricStatus("Biometric authentication failed.");
      }
    } else {
      setBiometricStatus("Biometrics not available on this device.");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={[styles.vectorContainer, { alignItems: "flex-start" }]}>
          <Image
            source={require("../../../assets/vectors/leftCircle.png")}
            style={styles.circle}
          />
        </View>
        <Animated.View
          style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}
        >
          <Image
            source={require("../../../assets/vectors/merged.png")}
            style={styles.logo}
          />
        </Animated.View>
        <View
          style={[
            styles.vectorContainer,
            { alignItems: "flex-end", width: "100%", top: height / 2.9 },
          ]}
        >
          <Image
            source={require("../../../assets/vectors/rightCircle.png")}
            style={[styles.circle, { marginRight: -20 }]}
          />
        </View>
        <Animated.View
          style={[
            styles.mainView,
            {
              transform: [
                { translateY: loginHeight },
                { translateX: loginWidth },
              ],
            },
          ]}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <TouchableOpacity
              style={styles.touchableRow}
              onPress={handleBiometricLogin}
            >
              <Ionicons
                name="finger-print-outline"
                size={40}
                color={Colors.font}
              />
              <Text style={styles.forgotText}> Biometric Login</Text>
            </TouchableOpacity>
          )}
          <LoginItem
            animateRegisterationUp={animateRegisterationUp}
            animateForgetIn={animateForgetIn}
            navigation={props.navigation}
          />
        </Animated.View>
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
        <Animated.View
          style={[
            styles.forgotContainer,
            { transform: [{ translateY: forgotXValue }] },
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={30}
            color={Colors.font}
            onPress={returnLogin}
            style={{
              fontWeight: "bold",
              marginLeft: 15,
            }}
          />
          <ForgotPassword returnLogin={returnLogin} />
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  innerContainer: {
    width: width * 0.95,
    height: height * 0.95,
    borderRadius: 30,
    borderColor: Colors.primary,
    borderWidth: 3.5,
    overflow: "hidden",
  },
  vectorContainer: {
    position: "absolute",
    top: height / 25,
    zIndex: -100,
  },
  circle: {
    height: height / 5.47,
    width: height / 9.522,
    marginLeft: -20,
  },
  logoContainer: {
    alignItems: "center",
    top: height / 6,
  },
  logo: {
    width: height / 3.3,
    height: height / 4.1,
    marginLeft: -height * 0.05,
  },
  touchableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: wp("40%"),
    alignSelf: "center",
    marginBottom: 5,
  },
  mainView: {
    position: "relative",
    alignSelf: "center",
    top: height / 3.5,
  },
  forgotText: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },
  registerationView: {
    position: "absolute",
    alignSelf: "center",
    top: hp("15%"),
  },
  forgotContainer: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    flex: 1,
  },
  forgotText: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },
});

export default AppLoginScreen;
