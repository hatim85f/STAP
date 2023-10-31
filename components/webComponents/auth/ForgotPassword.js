import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
} from "react-native";

import InputsContainer from "./InputsContainer";
import CustomInput from "../Input/Input";
import {
  Entypo,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { Button } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../../constants/Colors";

import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../../store/auth/authActions";
import * as systemMessagesActions from "../../../store/messages/messagesActions";
import Loader from "../../Loader";

const ForgotPassword = (props) => {
  const { returnLogin } = props;
  const { codeVerified, showError } = useSelector((state) => state.auth);
  const { systemMessage, showSystemMessage } = useSelector(
    (state) => state.messages
  );

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [getCode, setGetCode] = useState(false);
  const [codeFirstDigit, setCodeFirstDigit] = useState(null);
  const [codeSecondDigit, setCodeSecondDigit] = useState(null);
  const [codeThirdDigit, setCodeThirdDigit] = useState(null);
  const [codeFourthDigit, setCodeFourthDigit] = useState(null);
  const [remainingTime, setRemainingTime] = useState(180); // Initial countdown time
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [confirmedPasswordMatch, setConfirmedPasswordMatch] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // confirming user is using valid email addredd
  const handleBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  // animating forgot details out and put code details in
  const emailContainerTransparency = useRef(new Animated.Value(1)).current;
  const codeContainerTransparency = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (getCode) {
      // If getCode is true, show the codeContainer and hide the emailContainer
      Animated.timing(emailContainerTransparency, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(codeContainerTransparency, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // If getCode is false, show the emailContainer and hide the codeContainer
      Animated.timing(emailContainerTransparency, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(codeContainerTransparency, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [getCode, codeContainerTransparency, emailContainerTransparency]);

  const dispatch = useDispatch();

  // verifying user code is correct
  const verify = () => {
    setIsLoading(true);
    try {
      dispatch(
        authActions.verifyCode(
          email,
          `${codeFirstDigit}${codeSecondDigit}${codeThirdDigit}${codeFourthDigit}`
        )
      ).then(() => {
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  // sending verification code to user email
  const sendVerification = () => {
    setIsLoading(true);

    try {
      setGetCode(true);
      // sending user email to get the code
      dispatch(authActions.sendToReset(email)).then(() => {
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (getCode) {
      // Start the countdown when getCode becomes true
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval); // Clear the interval when countdown reaches 0
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval); // Clear the interval on component unmount
      };
    }
  }, [getCode]);

  // making sure if user send wrong email to not step forward
  useEffect(() => {
    if (showError) {
      setGetCode(false);
    }
  }, [showError]);

  // sending newPassword to backend
  const resetPassword = () => {
    if (password === confirmedPassword) {
      setIsLoading(true);
      dispatch(authActions.changePassword(password)).then(() => {
        setIsLoading(false);
      });
    }
  };

  // checking if two passwords are match
  const handlePasswordBlur = () => {
    if (password !== confirmedPassword) {
      setConfirmedPasswordMatch(false);
    }
  };

  // clear system message
  const clearMessage = () => {
    dispatch(systemMessagesActions.clearMessage());
    returnLogin();
  };

  return (
    <InputsContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          {!getCode && (
            <View style={[styles.emailContainer]}>
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.message}>
                Enter your Email address to retrive your Password
              </Text>

              <CustomInput
                placeholder="Email Address"
                onChangeText={(text) => setEmail(text)}
                textContentType="emailAddress"
                rightIcon={() => (
                  <Entypo name="email" size={24} color="black" />
                )}
                onBlur={handleBlur}
                onFocus={() => setIsValidEmail(true)}
                onSubmitEditing={sendVerification}
                error="Invalid email address"
                showError={!isValidEmail}
              />
            </View>
          )}
          {getCode && !codeVerified && (
            <View style={[styles.emailContainer]}>
              <View style={styles.smallRow}>
                <Ionicons
                  name="chevron-back-sharp"
                  size={40}
                  color="black"
                  style={{ backgroundColor: "white" }}
                  onPress={() => setGetCode(false)}
                />
                <Text style={styles.title}>Enter Verification Code</Text>
              </View>
              <Text style={styles.message}>
                Please Check your Email to get the code
              </Text>
              <View style={styles.row}>
                <TextInput
                  textContentType="number"
                  onChangeText={(text) => setCodeFirstDigit(text)}
                  style={styles.input}
                />
                <TextInput
                  textContentType="number"
                  onChangeText={(text) => setCodeSecondDigit(text)}
                  style={styles.input}
                />
                <TextInput
                  textContentType="number"
                  onChangeText={(text) => setCodeThirdDigit(text)}
                  style={styles.input}
                />
                <TextInput
                  textContentType="number"
                  onChangeText={(text) => setCodeFourthDigit(text)}
                  style={styles.input}
                  onSubmitEditing={verify}
                />
              </View>
            </View>
          )}
          {codeVerified && !showSystemMessage && (
            <View style={styles.emailContainer}>
              <View style={[styles.smallRow, { marginBottom: hp("10%") }]}>
                <Ionicons
                  name="chevron-back-sharp"
                  size={40}
                  color="black"
                  style={{ backgroundColor: "white" }}
                  onPress={() => setGetCode(false)}
                />
                <Text style={styles.title}>Reset Password</Text>
              </View>

              <CustomInput
                placeholder="New Password"
                placeholderTextColor={"#6a6b6c"}
                onChangeText={(text) => setPassword(text)}
                textContentType="password"
                secureTextEntry={hidePassword}
                rightIcon={() => {
                  return (
                    <View style={styles.inputRow}>
                      <TouchableOpacity
                        onPress={() => setHidePassword(!hidePassword)}
                        style={{ cursor: "pointer" }}
                      >
                        {hidePassword ? (
                          <FontAwesome
                            name="eye-slash"
                            size={24}
                            color="black"
                          />
                        ) : (
                          <FontAwesome name="eye" size={24} color="black" />
                        )}
                      </TouchableOpacity>
                      <Entypo name="lock" size={24} color="black" />
                    </View>
                  );
                }}
              />
              <CustomInput
                placeholder="Confirm New Password"
                placeholderTextColor={"#6a6b6c"}
                onChangeText={(text) => setConfirmedPassword(text)}
                textContentType="password"
                secureTextEntry={hidePassword}
                onBlur={handlePasswordBlur}
                error="Password is Not Matching"
                showError={!confirmedPasswordMatch}
                onFocus={() => setConfirmedPasswordMatch(true)}
                rightIcon={() => {
                  return (
                    <View style={styles.inputRow}>
                      <TouchableOpacity
                        onPress={() => setHidePassword(!hidePassword)}
                        style={{ cursor: "pointer" }}
                      >
                        {hidePassword ? (
                          <FontAwesome
                            name="eye-slash"
                            size={24}
                            color="black"
                          />
                        ) : (
                          <FontAwesome name="eye" size={24} color="black" />
                        )}
                      </TouchableOpacity>
                      <Entypo name="lock" size={24} color="black" />
                    </View>
                  );
                }}
              />
            </View>
          )}
          {codeVerified && showSystemMessage && (
            <View style={styles.emailContainer}>
              <Image
                source={require("../../../assets/vectors/resetPassword.png")}
                style={{
                  height: hp("25%"),
                  width: hp("25%"),
                }}
              />
              <Text style={styles.title}>Password Reset Successfully</Text>
              <Text style={[styles.message, { marginBottom: hp("4%") }]}>
                {systemMessage}
              </Text>
            </View>
          )}

          {!getCode && (
            <Button
              title="Send Verification"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.buttonStyle}
              onPress={sendVerification}
            />
          )}
          {getCode && !codeVerified && (
            <Button
              title="Verify"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.buttonStyle}
              onPress={verify}
            />
          )}
          {codeVerified && !showSystemMessage && (
            <Button
              title="Reset Password"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.buttonStyle}
              onPress={resetPassword}
            />
          )}
          {codeVerified && showSystemMessage && (
            <Button
              title="Login"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.buttonStyle}
              onPress={clearMessage}
            />
          )}
          {getCode && !showSystemMessage && (
            <View style={styles.afterMessage}>
              <Text style={styles.smallMessage}>
                didn't you receive a code ?
              </Text>
              <TouchableOpacity
                disabled={remainingTime !== 0}
                style={{ cursor: "pointer" }}
                onPress={() => {
                  setGetCode(false);
                  setRemainingTime(180);
                  sendVerification();
                  setGetCode(true);
                }}
              >
                <Text style={styles.countDownText}>
                  {remainingTime > 0
                    ? `Resend in ${Math.floor(remainingTime / 60)
                        .toString()
                        .padStart(2, "0")}:${(remainingTime % 60)
                        .toString()
                        .padStart(2, "0")}`
                    : "Resend Code"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Fragment>
      )}
    </InputsContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: wp("1.4%"),
    fontFamily: "headers",
    fontWeight: "300",
    marginTop: hp("1%"),
  },
  message: {
    fontFamily: "headers",
    fontSize: wp("0.85%"),
    color: Colors.font,
    fontWeight: "300",
    marginTop: hp("1%"),
    marginBottom: hp("10%"),
  },
  buttonStyle: {
    marginTop: hp("10%"),
    width: wp("26%"),
    borderRadius: 25,
    height: hp("6%"),
    backgroundColor: Colors.primary,
    marginTop: hp("10%"),
    marginBottom: hp("2.5%"),
  },
  buttonTitle: {
    fontFamily: "headers",
    fontSize: wp("1.1%"),
  },
  emailContainer: {
    flex: 1,
    alignItems: "center",
    height: hp("25%"),
    width: "100%",
    position: "relative",
    top: 0,
    zIndex: -100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp("26.5%"),
    zIndex: 100,
  },
  smallMessage: {
    fontFamily: "headers",
    fontSize: wp("0.8%"),
    color: "#2B2B2B",
  },
  countDownText: {
    fontFamily: "headers",
    fontWeight: "bold",
    marginTop: hp("1.5%"),
    textAlign: "center",
    fontSize: wp("1%"),
    color: "#2B2B2B",
  },
  input: {
    borderRadius: 5,
    width: 120,
    borderWidth: 0,
    borderColor: "",
    height: hp("6.5%"),
    textAlign: "center",
    backgroundColor: "white",
    fontFamily: "headers",
    color: Colors.font,
    fontSize: wp("1%"),
  },
  smallRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: wp("20%"),
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp("100%") / 25,
  },
});

export default ForgotPassword;
