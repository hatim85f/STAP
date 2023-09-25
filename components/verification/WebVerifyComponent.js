import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import * as authActions from "../../store/auth/authActions";

const WebVerifyComponent = (props) => {
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

  const requestCode = async () => {
    setIsLoading(true);
    await dispatch(authActions.verifyEmail()).then(() => {
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
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.detailsContainer}>
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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  detailsContainer: {
    height: globalHeight("50%"),
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
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
    width: globalWidth("20%"),
    backgroundColor: Colors.primary,
    marginBottom: globalHeight("2.5%"),
  },
  buttonTitle: {
    fontFamily: "headers",
    fontSize: globalHeight("2%"),
  },
  link: {
    color: "blue",
    textDecorationColor: "blue",
    textDecorationLine: "underline",
    fontSize: globalWidth("1.2%"),
    fontStyle: "italic",
  },
});

export const WebVerifyComponentOptions = (navData) => {
  return {
    headerTitle: "WebVerifyComponent",
  };
};

export default WebVerifyComponent;
