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
import { height, width } from "../../constants/dimensions";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { Button } from "react-native-elements";
import * as authActions from "../../store/auth/authActions";
import Loader from "../Loader";

const AppVerifyEmail = (props) => {
  const { user, verificationSuccess } = useSelector((state) => state.auth);

  const [codeFirstDigit, setCodeFirstDigit] = useState(null);
  const [codeSecondDigit, setCodeSecondDigit] = useState(null);
  const [codeThirdDigit, setCodeThirdDigit] = useState(null);
  const [codeFourthDigit, setCodeFourthDigit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // setting refs for code text inputs
  const secondCode = useRef();
  const thirdCode = useRef();
  const fourthCode = useRef();

  const dispatch = useDispatch();

  console.log(verificationSuccess);

  const requestCode = () => {
    setIsLoading(true);
    dispatch(authActions.verifyEmail()).then(() => {
      setIsLoading(false);
    });
  };

  const verify = () => {
    setIsLoading(true);
    try {
      dispatch(
        authActions.confirmCode(
          `${codeFirstDigit}${codeSecondDigit}${codeThirdDigit}${codeFourthDigit}`
        )
      ).then(() => {
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { navigation } = props;

  useEffect(() => {
    if (verificationSuccess) {
      navigation.navigate("Home");
    } else {
      return;
    }
  }, [verificationSuccess, navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={[styles.vectorContainer, { alignItems: "flex-start" }]}>
          <Image
            source={require("../../assets/vectors/leftCircle.png")}
            style={styles.circle}
          />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/vectors/merged.png")}
            style={styles.logo}
          />
        </View>
        <View
          style={[
            styles.vectorContainer,
            { alignItems: "flex-end", width: "100%", top: height / 2.9 },
          ]}
        >
          <Image
            source={require("../../assets/vectors/rightCircle.png")}
            style={[styles.circle, { marginRight: -20 }]}
          />
        </View>

        <View style={styles.detailsContainer}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Text style={styles.note}>
                A verification email has been sent to:
              </Text>
              <Text
                style={[
                  styles.note,
                  {
                    color: Colors.primary,
                    fontStyle: "italic",
                    fontWeight: "bold",
                  },
                ]}
              >
                {user.email}
              </Text>
              <Text style={[styles.note, { marginTop: 15 }]}>
                Enter the code below to verify your email
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
              <Button
                title="Verify"
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.buttonStyle}
                onPress={verify}
                disabled={
                  !codeFirstDigit ||
                  !codeSecondDigit ||
                  !codeThirdDigit ||
                  !codeFourthDigit
                }
              />
              <TouchableOpacity onPress={requestCode}>
                <Text style={styles.link}>Resend Code</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
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
  detailsContainer: {
    height: globalHeight("50%"),
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
    marginTop: globalHeight("25%"),
  },
  note: {
    fontFamily: "headers",
    color: Colors.font,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 100,
    width: "100%",
    marginTop: 25,
  },
  input: {
    borderRadius: 5,
    borderWidth: 0,
    height: globalHeight("6.5%"),
    textAlign: "center",
    backgroundColor: "#CBC8C8",
    fontFamily: "headers",
    color: Colors.font,
    fontSize: globalHeight("2.5%"),
    width: "22%",
  },
  buttonStyle: {
    marginTop: globalHeight("5%"),
    borderRadius: 10,
    height: globalHeight("6%"),
    width: globalWidth("70%"),
    backgroundColor: Colors.primary,
    marginBottom: globalHeight("2.5%"),
  },
  buttonTitle: {
    fontFamily: "headers",
    fontSize: globalHeight("2%"),
  },
});

export const AppVerifyEmailOptions = (navData) => {
  return {
    headerTitle: "AppVerifyEmail",
  };
};

export default AppVerifyEmail;
