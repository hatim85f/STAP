import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import Colors from "../../constants/Colors";
import {
  MaterialIcons,
  AntDesign,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";

import { iconSizes } from "../../constants/sizes";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { isTablet, isWeb } from "../../constants/device";
import { useRef } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import * as authActions from "../../store/auth/authActions";
import CountryCodeSelect from "../helpers/CountryCodeSelect";
import { Alert } from "react-native";
import Loader from "../Loader";
import CustomInput from "../appComponents/Input/Input";
import WebAlert from "../webAlert/WebAlert";

const ContactInformation = (props) => {
  const {
    email,
    phone,
    emailVerified,
    verifyEmail,
    verifyPhone,
    phoneVerified,
    editMail,
    editPhone,
  } = props;

  const phoneBoxHeight = useRef(
    new Animated.Value(-globalHeight("150%"))
  ).current;
  const emailBoxHeight = useRef(
    new Animated.Value(-globalHeight("150%"))
  ).current;

  const dispatch = useDispatch();

  // ================================================STATE================================================

  const [newPhone, setNewPhone] = useState("");
  const [country, setCountry] = useState("");
  const [clearCountryCode, setClearCountryCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newEmail, setnewEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState("");
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // ================================================FUNCTIONS================================================

  // =====================================================CHANGE PHONE================================================

  // ANIMATING THE PHONE BOX OUT
  const animateBoxOut = () => {
    Animated.timing(phoneBoxHeight, {
      toValue: -globalHeight("150%"),
      duration: 2500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  // ANIMATING THE PHONE BOX IN
  const animateBoxIn = () => {
    Animated.timing(phoneBoxHeight, {
      toValue: -globalHeight("15%"),
      duration: 2500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  // =====================================CHANGE PHONE FUNCTION==============================================
  const changePhone = () => {
    const newPhoneNumber = `${country}${newPhone}`;
    setIsLoading(true);
    dispatch(authActions.changePhone(newPhoneNumber));
    setNewPhone("");
    setCountry("");

    dispatch(authActions.getProfile());
    setClearCountryCode(true);
    setIsLoading(false);
    setShowAlert(false);
    animateBoxOut();
  };

  // =====================================CHANGE EMAIL==============================================

  // confirming user is using valid email addredd
  const handleBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(newEmail)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  // ANIMATING THE EMAIL BOX OUT
  const animateEmailBoxOut = () => {
    Animated.timing(emailBoxHeight, {
      toValue: -globalHeight("150%"),
      duration: 2500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  // ANIMATING THE EMAIL BOX IN
  const animateEmailBoxIn = () => {
    Animated.timing(emailBoxHeight, {
      toValue: -globalHeight("15%"),
      duration: 2500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  // =====================================CHANGE EMAIL FUNCTION==============================================
  const changeEmail = () => {
    setIsLoading(true);
    dispatch(authActions.changeEmail(newEmail, password));
    setnewEmail("");
    setPassword("");
    dispatch(authActions.getProfile());
    setIsLoading(false);
    setShowEmailAlert(false);
    animateEmailBoxOut();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={animateEmailBoxIn}
        style={{ width: isWeb() ? "85%" : "95%", alignItems: "flex-end" }}
      >
        <AntDesign name="edit" size={28} color="black" />
      </TouchableOpacity>
      <Card style={[styles.contentRow]}>
        <View style={styles.icon}>
          <MaterialIcons name="email" size={iconSizes()} color={Colors.font} />
          <Text style={styles.data}>{email}</Text>
        </View>

        <View style={styles.verifyBox}>
          {emailVerified ? (
            <Text
              style={[
                styles.verified,
                { color: "green", textDecorationLine: "none" },
              ]}
            >
              {" "}
              (Verified){" "}
            </Text>
          ) : (
            <Pressable onPress={verifyEmail} style={styles.smallRow}>
              <Text style={styles.verified}> Verify Mail </Text>
            </Pressable>
          )}
        </View>
      </Card>
      <TouchableOpacity
        onPress={animateBoxIn}
        style={{ width: isWeb() ? "85%" : "95%", alignItems: "flex-end" }}
      >
        <AntDesign name="edit" size={28} color="black" />
      </TouchableOpacity>
      <Card style={styles.contentRow}>
        <View style={styles.icon}>
          <MaterialIcons
            name="phone-android"
            size={iconSizes()}
            color={Colors.font}
          />
          <Text style={styles.data}>{phone}</Text>
        </View>
      </Card>
      <Animated.View
        style={[
          styles.phoneBox,
          { transform: [{ translateY: phoneBoxHeight }] },
        ]}
      >
        <TouchableOpacity onPress={animateBoxOut}>
          <AntDesign
            name="closecircle"
            size={24}
            color={Colors.primary}
            style={{ alignSelf: "flex-end" }}
          />
        </TouchableOpacity>
        <View style={styles.inputDetails}>
          <View style={styles.codeContainer}>
            <CountryCodeSelect
              getCountry={setCountry}
              clearData={clearCountryCode}
            />
          </View>
          <View style={{ height: globalHeight("5%") }} />
          <CustomInput
            value={newPhone}
            onChangeText={(text) => setNewPhone(text)}
            keyboardType="number-pad"
            placeholder="Enter Phone Number"
            rightIcon={() => {
              return <Entypo name="phone" size={24} color="black" />;
            }}
          />
          <Button
            title="Submit"
            onPress={() => setShowAlert(true)}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitleStyle}
            disabled={newPhone.length < 8}
            disabledStyle={{ borderWidth: 0 }}
            disabledTitleStyle={{ color: "#fefefe" }}
          />
        </View>
      </Animated.View>
      <WebAlert
        showAlert={showAlert}
        onOk={changePhone}
        okText="Confrim"
        cancelText="Cancel"
        message="By clicking confirm you will be changing your phone number"
        onCancel={animateBoxOut}
        title="Change Phone Number"
      />
      <Animated.View
        style={[
          styles.phoneBox,
          { transform: [{ translateY: emailBoxHeight }] },
        ]}
      >
        <TouchableOpacity onPress={animateEmailBoxOut}>
          <AntDesign
            name="closecircle"
            size={24}
            color={Colors.primary}
            style={{ alignSelf: "flex-end" }}
          />
        </TouchableOpacity>
        <CustomInput
          placeholder="Email Address"
          onChangeText={(text) => setnewEmail(text)}
          textContentType="emailAddress"
          rightIcon={() => <Entypo name="email" size={24} color="black" />}
          onBlur={handleBlur}
          onFocus={() => setIsValidEmail(true)}
          error="Invalid email address"
          showError={!isValidEmail}
        />
        <View style={{ height: globalHeight("5%") }} />
        <CustomInput
          placeholder="Password"
          placeholderTextColor={"#6a6b6c"}
          onChangeText={(text) => setPassword(text)}
          textContentType="password"
          secureTextEntry={hidePassword}
          rightIcon={() => {
            return (
              <Pressable
                onPress={() => setHidePassword(!hidePassword)}
                style={{ cursor: "pointer" }}
              >
                {hidePassword ? (
                  <FontAwesome name="eye-slash" size={24} color="black" />
                ) : (
                  <FontAwesome name="eye" size={24} color="black" />
                )}
              </Pressable>
            );
          }}
        />
        <Button
          title="Submit"
          onPress={() => setShowEmailAlert(true)}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitleStyle}
          disabled={!isValidEmail || password.length < 6}
          disabledStyle={{ borderWidth: 0 }}
          disabledTitleStyle={{ color: "#fefefe" }}
        />
      </Animated.View>
      <WebAlert
        showAlert={showEmailAlert}
        onOk={changeEmail}
        okText="Confrim"
        cancelText="Cancel"
        message="By clicking confirm you will be changing your email address"
        onCancel={animateEmailBoxOut}
        title="Change Email Address"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderWidth: 0,
    borderRadius: 8,
    height: globalHeight("8%"),
    width: isWeb() ? "70%" : "90%",
    marginBottom: 10,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "60%",
    paddingHorizontal: isWeb() ? 10 : 0,
  },
  data: {
    marginLeft: 5,
    fontFamily: "headers",
    color: Colors.primary,
    fontSize: isWeb()
      ? globalWidth("1%")
      : isTablet()
      ? globalWidth("2%")
      : globalWidth("3.5%"),
  },
  verified: {
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1.5%")
      : isTablet()
      ? globalWidth("3%")
      : globalWidth("4%"),
  },

  verified: {
    fontFamily: "headers",
    color: "blue",
    textDecorationColor: "blue",
    textDecorationLine: "underline",
    fontSize: isWeb()
      ? globalWidth("1%")
      : isTablet()
      ? globalWidth("2%")
      : globalWidth("3%"),
  },
  phoneBox: {
    position: "absolute",
    width: "95%",
    height: globalHeight("35%"),
    backgroundColor: "white",
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 10,
    borderColor: Colors.haizyColor,
    borderWidth: 3,
    zIndex: 100,
    padding: 10,
  },
  codeContainer: {
    width: "60%",
    alignSelf: "center",
    backgroundColor: "white",
    zIndex: 100,
  },
  buttonTitleStyle: {
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1.5%")
      : isTablet()
      ? globalWidth("3%")
      : globalWidth("4%"),
    color: Colors.font,
  },
  buttonStyle: {
    backgroundColor: "transparent",
    width: "40%",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: globalHeight("5%"),
  },
});

export const ContactInformationOptions = (navData) => {
  return {
    headerTitle: "ContactInformation",
  };
};

export default ContactInformation;
