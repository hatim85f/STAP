import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  Alert,
} from "react-native";

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
// import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../../store/auth/authActions";
import * as systemMessagesActions from "../../../store/messages/messagesActions";
import Loader from "../../Loader";

const ForgotPassword = (props) => {
  const { returnLogin } = props;
  const { codeVerified, showError, error, errorMessage } = useSelector(
    (state) => state.auth
  );
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

  // showing error
  useEffect(() => {
    if (error) {
      Alert.alert(error, errorMessage, [
        {
          text: "OK",
          onPress: () => {
            dispatch(authActions.clearError());
            setGetCode(false);
          },
        },
      ]);
    }
  }, [error, errorMessage, dispatch]);

  console.log(error, errorMessage);

  useEffect(() => {
    if (getCode && !codeVerified) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
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

  // setting refs for code text inputs
  const secondCode = useRef();
  const thirdCode = useRef();
  const fourthCode = useRef();

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
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          {!getCode && (
            <View style={[styles.emailContainer]}>
              <Image
                source={require("../../../assets/vectors/forgotPassword.png")}
                style={styles.image}
              />
              <Text style={styles.title}>Forgot Password ? </Text>
              <Text style={styles.message}>
                Enter your Email address to retrive your Password
              </Text>
              <CustomInput
                placeholder="Email Address"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                rightIcon={() => (
                  <Entypo name="email" size={24} color="black" />
                )}
                style={{ width: "100%" }}
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
              <Image
                source={require("../../../assets/vectors/enterCode.png")}
                style={styles.image}
              />
              <View style={styles.smallRow}>
                <Text style={styles.title}>Enter Verification Code</Text>
              </View>
              <Text style={styles.message}>
                Please Check your Email to get the code
              </Text>
              <View style={styles.row}>
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={(text) => {
                    setCodeFirstDigit(text);
                    if (text.length === 1 && !isNaN(text)) {
                      secondCode.current.focus();
                    }
                  }}
                  style={styles.input}
                  returnKeyType="next"
                />
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={(text) => {
                    setCodeSecondDigit(text);
                    if (text.length === 1 && !isNaN(text)) {
                      thirdCode.current.focus();
                    }
                  }}
                  style={styles.input}
                  returnKeyType="next"
                  ref={secondCode}
                />
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={(text) => {
                    setCodeThirdDigit(text);
                    if (text.length === 1 && !isNaN(text)) {
                      fourthCode.current.focus();
                    }
                  }}
                  style={styles.input}
                  returnKeyType="next"
                  ref={thirdCode}
                />
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={(text) => {
                    setCodeFourthDigit(text);
                  }}
                  onEndEditing={() => {
                    if (
                      codeFourthDigit &&
                      codeFourthDigit.length === 1 &&
                      !isNaN(codeFourthDigit)
                    ) {
                      verify();
                    }
                  }}
                  style={styles.input}
                  returnKeyType="done"
                  ref={fourthCode}
                />
              </View>
            </View>
          )}
          {codeVerified && !showSystemMessage && (
            <View style={styles.emailContainer}>
              <Image
                source={require("../../../assets/vectors/resetCode.png")}
                style={styles.image}
              />
              <Text style={styles.title}>Reset Password</Text>
              <View style={{ height: hp("20%") }} />
              <CustomInput
                placeholder="New Password"
                placeholderTextColor={"#6a6b6c"}
                onChangeText={(text) => setPassword(text)}
                style={{ width: "100%" }}
                secureTextEntry={hidePassword}
                rightIcon={() => {
                  return (
                    <View style={styles.inputRow}>
                      <TouchableOpacity
                        onPress={() => setHidePassword(!hidePassword)}
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
                style={{ width: "100%" }}
                error="Password is Not Matching"
                showError={!confirmedPasswordMatch}
                onFocus={() => setConfirmedPasswordMatch(true)}
                rightIcon={() => {
                  return (
                    <TouchableOpacity
                      onPress={() => setHidePassword(!hidePassword)}
                    >
                      {hidePassword ? (
                        <FontAwesome name="eye-slash" size={24} color="black" />
                      ) : (
                        <FontAwesome name="eye" size={24} color="black" />
                      )}
                    </TouchableOpacity>
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
                  width: hp("20%"),
                  height: hp("20%"),
                  alignSelf: "center",
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
              title="Send Verification Code"
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
              disabled={!password || password !== confirmedPassword}
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
          {getCode && !codeVerified && (
            <View style={styles.afterMessage}>
              <Text style={styles.smallMessage}>
                Didn't you receive a code ?
              </Text>
              <TouchableOpacity
                disabled={remainingTime !== 0}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: hp("30%"),
    width: hp("30%"),
    alignSelf: "center",
  },
  title: {
    fontSize: hp("3.5%"),
    fontFamily: "headers",
    fontWeight: "300",
    marginTop: hp("1%"),
    textAlign: "center",
  },
  message: {
    fontFamily: "headers",
    fontSize: hp("2.5%"),
    color: "#6a6b6c",
    fontWeight: "300",
    marginTop: hp("1%"),
    marginBottom: hp("10%"),
    textAlign: "center",
    marginHorizontal: wp("2%"),
  },
  buttonStyle: {
    marginTop: hp("5%"),
    borderRadius: 25,
    height: hp("6%"),
    width: wp("70%"),
    backgroundColor: Colors.primary,
    marginBottom: hp("2.5%"),
  },
  buttonTitle: {
    fontFamily: "headers",
    fontSize: hp("2%"),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 100,
  },
  emailContainer: {
    zIndex: -100,
  },
  smallMessage: {
    fontFamily: "headers",
    fontSize: hp("2%"),
    color: "#2B2B2B",
  },
  countDownText: {
    fontFamily: "headers",
    marginTop: hp("1.5%"),
    textAlign: "center",
    fontSize: hp("2.5%"),
    color: "#2B2B2B",
  },
  input: {
    borderRadius: 5,
    borderWidth: 0,
    height: hp("6.5%"),
    textAlign: "center",
    backgroundColor: "#CBC8C8",
    fontFamily: "headers",
    color: Colors.font,
    fontSize: hp("2.5%"),
    width: "22%",
  },
  // smallRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-around",
  // },
  // inputRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  // },
});

export default ForgotPassword;
