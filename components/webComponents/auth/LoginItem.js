import React, { useState, Fragment } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputsContainer from "./InputsContainer";
import { Button, Input } from "react-native-elements";
import { MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons";
import * as authActions from "../../../store/auth/authActions";
import Colors from "../../../constants/Colors";

import Loader from "../../Loader";
import CustomInput from "../Input/Input";

const LoginItem = (props) => {
  const { animateRegisterationUp, animateForgetIn } = props;

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  const dispatch = useDispatch();

  const login = async () => {
    setIsLoading(true);
    try {
      if (isValidEmail && password.length > 0) {
        await dispatch(authActions.login(email, password)).then(() => {
          setIsLoading(false);
        });
        if (isLoggedIn) {
          props.navigation.navigate("Home");
        }
      }
    } catch (error) {
      Alert.alert("Warning", "Email and Password must be provided", [
        { text: "OK", onPress: () => setIsLoading(false) },
      ]);
      props.navigation.navigate("Login");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <InputsContainer>
        <CustomInput
          placeholder="Email adress"
          onChangeText={(text) => setEmail(text)}
          textContentType="emailAddress"
          onFocus={() => setIsValidEmail(true)}
          onBlur={handleBlur}
          error="Invalid email address"
          showError={!isValidEmail}
          rightIcon={() => {
            return (
              <MaterialIcons name="alternate-email" size={24} color="black" />
            );
          }}
        />
        <CustomInput
          placeholder="Password"
          placeholderTextColor={"#6a6b6c"}
          onChangeText={(text) => setPassword(text)}
          textContentType="password"
          secureTextEntry={hidePassword}
          onSubmitEditing={login}
          rightIcon={() => {
            return (
              <View style={styles.inputRow}>
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                  style={{ cursor: "pointer" }}
                >
                  {hidePassword ? (
                    <FontAwesome name="eye-slash" size={24} color="black" />
                  ) : (
                    <FontAwesome name="eye" size={24} color="black" />
                  )}
                </TouchableOpacity>
                <Entypo name="lock" size={24} color="black" />
              </View>
            );
          }}
        />
        <View style={styles.buttonsFormRow}>
          <Button
            title="Login Now"
            onPress={login}
            buttonStyle={styles.logButton}
            titleStyle={styles.logTitle}
          />
          <Button
            title="Register"
            onPress={animateRegisterationUp}
            buttonStyle={styles.logButton}
            titleStyle={styles.logTitle}
          />
        </View>
      </InputsContainer>
      <TouchableOpacity
        onPress={animateForgetIn}
        style={styles.forgotContainer}
      >
        <Text style={styles.forgotText}>forgot password ? click here ...</Text>
      </TouchableOpacity>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp("100%") / 25,
  },
  buttonsFormRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("26%"),
    marginTop: hp("1%"),
  },
  logButton: {
    width: wp("10%"),
    backgroundColor: "white",
    borderRadius: 25,
    height: hp("6%"),
  },
  logTitle: {
    fontFamily: "headers",
    color: "#6a6b6c",
  },

  inputContainer: {
    borderBottomWidth: 0, // Remove the bottom border
    backgroundColor: "transparent",
    height: hp("4%"),
  },

  forgotContainer: {
    width: wp("28%"),
    alignSelf: "center",
    cursor: "pointer",
  },
  forgotText: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: wp("1%"),
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 5,
  },
});

export default LoginItem;
