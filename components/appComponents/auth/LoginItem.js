import React, {
  useState,
  Fragment,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputsContainer from "./InputsContainer";
import { Button, Input } from "react-native-elements";
import { MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons";
import * as authActions from "../../../store/auth/authActions";

import Loader from "../../Loader";
import CustomInput from "../Input/Input";
import * as LocalAuthentication from "expo-local-authentication";

const LoginItem = (props) => {
  const { animateRegisterationUp, animateForgetIn } = props;

  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const handleBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  const dispatch = useDispatch();

  // user is navigating to home even if he response is not ok
  // need to fix this

  useEffect(() => {
    if (token) {
      props.navigation.navigate("Intro");
    }
  }, [token]);

  useEffect(() => {
    if ((isValidEmail && email.length > 0) || password.length > 0) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [email, isValidEmail, password]);

  const login = () => {
    setIsLoading(true);

    if (formIsValid) {
      try {
        dispatch(authActions.login(email, password)).then(() => {
          setIsLoading(false);
        });
      } catch (error) {
        Alert.alert("Warning", "Invalid Username or Password", [
          { text: "OK", onPress: () => setIsLoading(false) },
        ]);
      }
    } else {
      Alert.alert(
        "Warning!",
        "Make sure to enter the correct username and password",
        [
          {
            text: "Ok",
            onPress: () => setIsLoading(false),
          },
        ]
      );
      return;
    }
  };

  const pass = useRef();

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
          onSubmitEditing={() => pass.current.focus()}
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
          ref={pass}
          rightIcon={() => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  {hidePassword ? (
                    <FontAwesome name="eye-slash" size={24} color="black" />
                  ) : (
                    <FontAwesome name="eye" size={24} color="black" />
                  )}
                </TouchableOpacity>
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
        </View>
        <TouchableOpacity
          onPress={animateForgetIn}
          style={styles.forgotContainer}
        >
          <Text style={styles.forgotText}>Forgot password</Text>
        </TouchableOpacity>
      </InputsContainer>
      <TouchableOpacity onPress={animateRegisterationUp}>
        <Text style={styles.message}>Don't have an account ? Register</Text>
      </TouchableOpacity>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp("100%") / 12.5,
  },
  buttonsFormRow: {
    justifyContent: "center",
  },
  logButton: {
    width: wp("60%"),
    backgroundColor: "white",
    borderRadius: 25,
  },
  logTitle: {
    fontFamily: "headers",
    color: "#6a6b6c",
  },
  forgotContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "80%",
  },
  forgotText: {
    color: "white",
    marginTop: 10,
    marginBottom: 10,
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    marginTop: 10,
    color: "#6a6b6c",
    fontFamily: "headers",
  },
});

export default LoginItem;
