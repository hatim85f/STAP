import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";

import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import UploadImage from "../helpers/UploadImages";

const PersonalDetails = (props) => {
  const {
    getFirstName,
    getLastName,
    getEmail,
    getPhone,
    getAddress,
    getProfileImage,
    getDOB,
    getPassword,
    businessId,
    businessName,
  } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [DOB, setDOB] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const [password, setPassword] = useState("");
  const [hidePassoword, setHidePassoword] = useState(true);
  const [phoneHasError, setPhoneHasError] = useState(false);

  const checkEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setEmailHasError(false);
      setEmail(email);
    } else {
      setEmailHasError(true);
    }
  };

  const checkPhone = (phone) => {
    // check phone number length and if the number starts with +
    if (phone.length >= 13 && phone[0] === "+") {
      setPhone(phone);
      setPhoneHasError(false);
    } else {
      setPhoneHasError(true);
    }
  };

  useEffect(() => {
    getFirstName(firstName);
  }, [firstName]);

  useEffect(() => {
    getLastName(lastName);
  }, [lastName]);

  useEffect(() => {
    getEmail(email);
  }, [email]);

  useEffect(() => {
    getPhone(phone);
  }, [phone]);

  useEffect(() => {
    getAddress(address);
  }, [address]);

  useEffect(() => {
    getProfileImage(profileImage);
  }, [profileImage]);

  useEffect(() => {
    getDOB(DOB);
  }, [DOB]);

  useEffect(() => {
    getPassword(password);
  }, [password]);

  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <Input
          defaultValue={firstName}
          onChangeText={(text) => setFirstName(text)}
          label="First Name"
          labelStyle={styles.label}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          rightIcon={
            <FontAwesome
              name="user"
              size={globalWidth("2%")}
              color={Colors.font}
            />
          }
          rightIconContainerStyle={styles.icon}
        />
        <Input
          defaultValue={lastName}
          onChangeText={(text) => setLastName(text)}
          label="Last Name"
          labelStyle={styles.label}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          rightIcon={
            <FontAwesome
              name="user"
              size={globalWidth("2%")}
              color={Colors.font}
            />
          }
          rightIconContainerStyle={styles.icon}
        />
        <Input
          defaultValue={password}
          onChangeText={(text) => setPassword(text)}
          label="Password"
          labelStyle={styles.label}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          secureTextEntry={hidePassoword}
          rightIcon={
            <TouchableOpacity onPress={() => setHidePassoword(!hidePassoword)}>
              {hidePassoword ? (
                <MaterialIcons
                  name="visibility"
                  size={globalWidth("2%")}
                  color={Colors.font}
                />
              ) : (
                <MaterialIcons
                  name="visibility-off"
                  size={globalWidth("2%")}
                  color={Colors.font}
                />
              )}
            </TouchableOpacity>
          }
          rightIconContainerStyle={styles.icon}
        />
        <Input
          defaultValue={email}
          onChangeText={(text) => checkEmail(text)}
          label="Email"
          labelStyle={styles.label}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          rightIcon={
            <Entypo name="email" size={globalWidth("2%")} color={Colors.font} />
          }
          rightIconContainerStyle={styles.icon}
          errorMessage={emailHasError ? "Invalid Email" : ""}
          errorStyle={styles.error}
        />
        <Input
          defaultValue={phone}
          onChangeText={(text) => checkPhone(text)}
          placeholder="+1234567890"
          label="Phone"
          labelStyle={styles.label}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          rightIcon={
            <Entypo name="phone" size={globalWidth("2%")} color={Colors.font} />
          }
          rightIconContainerStyle={styles.icon}
          errorMessage={phoneHasError ? "Invalid Phone" : ""}
          errorStyle={styles.error}
        />
      </View>
      <View style={styles.innerView}>
        <Input
          defaultValue={address}
          onChangeText={(text) => setAddress(text)}
          label="Address"
          labelStyle={styles.label}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          rightIcon={
            <Entypo
              name="address"
              size={globalWidth("2%")}
              color={Colors.font}
            />
          }
          rightIconContainerStyle={styles.icon}
        />
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { fontWeight: "bold" }]}>
            Profile Image
          </Text>
          <UploadImage
            imageName={`${businessName}/${firstName}_${lastName}`}
            getURL={(data) => setProfileImage(data)}
            disabled={!firstName || !lastName}
            subFolder={`partners`}
          />
        </View>
        <Input
          defaultValue={DOB}
          onChangeText={(text) => setDOB(text)}
          placeholder="DD/MM/YYYY"
          label="Date of Birth"
          labelStyle={styles.label}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          rightIcon={
            <MaterialCommunityIcons
              name="calendar"
              size={globalWidth("2%")}
              color={Colors.font}
            />
          }
          rightIconContainerStyle={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  innerView: {
    width: "48.5%",
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: Colors.font,
    padding: globalWidth("2%"),
  },
  inputContainer: {
    alignSelf: "center",
  },
  input: {
    fontFamily: "HelveticaNeue",
    color: Colors.font,
    fontSize: globalWidth("1.2%"),
  },
  icon: {
    marginRight: globalWidth("2%"),
  },
  label: {
    fontFamily: "Poppins_400Regular",
    color: Colors.font,
    fontSize: globalWidth("1%"),
  },
  error: {
    fontFamily: "Poppins_400Regular",
    color: "red",
    fontSize: globalWidth("1%"),
    textAlign: "center",
  },
});

export const PersonalDetailsOptions = (navData) => {
  return {
    headerTitle: "PersonalDetails",
  };
};

export default PersonalDetails;
