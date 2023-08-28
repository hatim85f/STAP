import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import InputsContainer from "./InputsContainer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../../constants/Colors";
import CustomInput from "../Input/Input";

import {
  Ionicons,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { Avatar, Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../../../store/auth/authActions";
import Loader from "../../Loader";

const RegisterationComponent = (props) => {
  const { countriesCodes } = useSelector((state) => state.auth);
  const { animteRegisterationDown } = props;

  const [formIsValid, setFormIsValid] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [confirmedPasswordMatch, setConfirmedPasswordMatch] = useState(true);
  const [userType, setUserType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [open, setOpen] = useState(false);
  const [usersList, setUsersList] = useState([
    { label: "Business Owner", value: "Business Owner" },
    { label: "Employee", value: "Employee" },
  ]);
  const [hidePassword, setHidePassword] = useState(true);

  const [confirmedEmailIsMatch, setConfirmedEmailIsMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [codesOpen, setCodesOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const dispatch = useDispatch();

  // confirming user is using valid email addredd
  const handleBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  // getting countries codes to display in the list

  useEffect(() => {
    if (countriesCodes.length === 0) {
      dispatch(authActions.getCountriesCodes());
    }
  }, [dispatch, countriesCodes]);

  useEffect(() => {
    const codes = countriesCodes.map((a) => {
      return {
        label: a.name,
        value: a.code + a.suffixes,
        icon: () => (
          <Avatar
            source={{ uri: a.flag }}
            size={35}
            rounded
            containerStyle={{ height: 35, width: 35, position: "relative" }} // Adjust the container size
            avatarStyle={{ height: "100%", width: "150%" }} // Display the image in full
          />
        ),
      };
    });
    setCountryCode(codes);
  }, [countriesCodes]);

  // Check if passwords match
  useEffect(() => {
    if (password === confirmedPassword) {
      setConfirmedPasswordMatch(true);
    } else {
      setConfirmedPasswordMatch(false);
    }
  }, [password, confirmedPassword]);

  // Check if email addresses match
  useEffect(() => {
    if (email === confirmedEmail) {
      setConfirmedEmailIsMatch(true);
    } else {
      setConfirmedEmailIsMatch(false);
    }
  }, [email, confirmedEmail]);

  // Check form validity
  useEffect(() => {
    const isValid =
      userName.trim() !== "" &&
      isValidEmail &&
      confirmedEmailIsMatch &&
      password.trim() !== "" &&
      confirmedPasswordMatch &&
      userType.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      selectedValue.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      designation.trim() !== "";

    setFormIsValid(isValid);
  }, [
    userName,
    isValidEmail,
    confirmedEmailIsMatch,
    password,
    confirmedPasswordMatch,
    userType,
    firstName,
    lastName,
    selectedValue,
    phoneNumber,
    designation,
  ]);

  // submitting registering functionality
  const register = () => {
    if (formIsValid) {
      setIsLoading(true);
      dispatch(
        authActions.registerUser(
          userName,
          email,
          userType,
          firstName,
          lastName,
          `${selectedValue}${phoneNumber}`,
          password,
          designation
        )
      ).then(() => {
        setIsLoading(false);
      });
      animteRegisterationDown();
    } else {
      alert("Warning", "Your Form is not Valid");
    }
  };

  return (
    <ScrollView
      scrollEnabled
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <TouchableOpacity
            onPress={animteRegisterationDown}
            style={styles.topContainer}
          >
            <Text style={styles.forgotText}>Have an account ? Login</Text>
          </TouchableOpacity>

          <InputsContainer>
            <Text style={styles.header}>SING UP</Text>
            <CustomInput
              placeholder="User Name"
              onChangeText={(text) => setUserName(text)}
              textContentType="name"
              rightIcon={() => (
                <Ionicons name="person" size={24} color="black" />
              )}
            />

            <CustomInput
              placeholder="Email Address"
              onChangeText={(text) => setEmail(text)}
              textContentType="emailAddress"
              rightIcon={() => <Entypo name="email" size={24} color="black" />}
              onBlur={handleBlur}
              onFocus={() => setIsValidEmail(true)}
              error="Invalid email address"
              showError={!isValidEmail}
            />
            <CustomInput
              placeholder="Confirm Email Address"
              onChangeText={(text) => setConfirmedEmail(text)}
              onFocus={() => setConfirmedEmailIsMatch(true)}
              textContentType="emailAddress"
              rightIcon={() => <Entypo name="email" size={24} color="black" />}
              error="Emails are not matching"
              showError={!confirmedEmailIsMatch}
            />
            <View style={styles.singleInputContainer}>
              <DropDownPicker
                open={open}
                value={userType}
                items={usersList}
                setOpen={setOpen}
                setValue={setUserType}
                setItems={setUsersList}
                placeholder="User Type"
                placeholderStyle={{ color: "#6a6b6c" }}
                style={styles.listStyle}
                textStyle={styles.dropText}
                listChildContainerStyle={{
                  borderRadius: 25,
                  borderColor: Colors.primary,
                }}
              />
            </View>
            <View style={styles.row}>
              <CustomInput
                style={{ width: wp("13%") }}
                placeholder="First Name"
                onChangeText={(text) => setFirstName(text)}
                textContentType="name"
              />
              <CustomInput
                style={{ width: wp("13%") }}
                placeholder="Last Name"
                onChangeText={(text) => setLastName(text)}
                textContentType="name"
              />
            </View>
            <View style={{ height: hp("0.5%") }} />
            <View style={[styles.row, { zIndex: 1000 }]}>
              <View style={{ height: hp("1%") }}>
                <View style={styles.singleInputContainer}>
                  <DropDownPicker
                    open={codesOpen}
                    value={selectedValue}
                    items={countryCode}
                    setOpen={setCodesOpen}
                    setValue={setSelectedValue}
                    setItems={setCountryCode}
                    placeholder="Select Country"
                    placeholderStyle={{ color: "#6a6b6c" }}
                    searchable={true} // Enable search functionality
                    searchablePlaceholder="Search for a country..." // Placeholder for search input
                    searchableStyle={{ color: "#6a6b6c" }} // Style for the search input
                    style={[
                      styles.listStyle,
                      { width: wp("13%"), height: wp("2.5%") },
                    ]}
                    textStyle={[styles.dropText, { fontSize: wp("0.75%") }]}
                    listChildContainerStyle={{
                      borderRadius: 25,
                      borderColor: Colors.primary,
                    }}
                  />
                </View>
              </View>
              <CustomInput
                style={{ width: wp("13.5%") }}
                placeholder="Phone Number"
                onChangeText={(text) => setPhoneNumber(text)}
                textContentType="number"
              />
            </View>
            <View style={{ height: hp("0.5%") }} />
            <CustomInput
              placeholder="Password"
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
            <CustomInput
              placeholder="Confirm Password"
              placeholderTextColor={"#6a6b6c"}
              onChangeText={(text) => setConfirmedPassword(text)}
              textContentType="password"
              secureTextEntry={hidePassword}
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
            <CustomInput
              placeholder="Designation"
              placeholderTextColor={"#6a6b6c"}
              onChangeText={(text) => setDesignation(text)}
              textContentType="name"
              rightIcon={() => (
                <FontAwesome5 name="critical-role" size={24} color="black" />
              )}
            />
            <View style={{ height: hp("0.5%") }} />
            <Button
              title="Sign Up"
              titleStyle={styles.title}
              onPress={register}
              buttonStyle={styles.buttonStyle}
            />
          </InputsContainer>
        </Fragment>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "headers",
    fontSize: wp("1.2%"),
    color: Colors.font,
    marginBottom: hp("1%"),
  },
  listStyle: {
    backgroundColor: "white",
    borderRadius: 25,
    width: wp("26.75%"),
    alignSelf: "center",
    borderWidth: 0,
    height: wp("3.5%"),
    zIndex: 100,
  },
  singleInputContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    marginBottom: hp("1.2%"),
    zIndex: 100,
  },
  dropText: {
    fontFamily: "headers",
    color: "black",
    fontSize: wp("1.1%"),
  },
  row: {
    flexDirection: "row",
    alignSelf: "center",
    width: wp("14%"),
    justifyContent: "center",
  },
  flagContainer: {
    flexDirection: "row",
  },

  inputRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp("100%") / 25,
  },
  buttonStyle: {
    width: wp("26.5%"),
    borderRadius: 15,
    height: hp("6%"),
    backgroundColor: Colors.primary,
  },
  title: {
    fontFamily: "headers",
    fontSize: wp("1%"),
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
});

export default RegisterationComponent;
