import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../components/BackButton";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import MainInput from "../../components/MainInput";
import InputsContainer from "../../components/webComponents/auth/InputsContainer";
import { Avatar, Button, Input } from "react-native-elements";
import * as authActions from "../../store/auth/authActions";
import Loader from "../../components/Loader";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import HeaderText from "../../components/HeaderText";
import * as teamActions from "../../store/team/teamActions";
const AddMemberScreen = (props) => {
  const { businessId } = props.route.params;
  const { countriesCodes } = useSelector((state) => state.auth);

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
    { label: "Business Admin", value: "Business Admin" },
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
        teamActions.inviteMember(
          email,
          password,
          userName,
          firstName,
          lastName,
          `${selectedValue}${phoneNumber}`,
          designation,
          userType,
          businessId,
          "www.stap-crm.com/intro"
        )
      ).then(() => {
        setUserName("");
        setEmail("");
        setConfirmedEmail("");
        setPassword("");
        setConfirmedPassword("");
        setConfirmedPasswordMatch(true);
        setUserType("");
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setDesignation("");
        props.navigation.navigate("team_details");
        setIsLoading(false);
      });
      return;
    } else {
      Alert.alert("Warning!", "Your form is not Valid", [
        { text: "OK", onPress: () => setIsLoading(false) },
      ]);
    }
  };

  // set ref for every input
  const userNameRef = useRef();
  const emailRef = useRef();
  const confirmedEmailRef = useRef();
  const passwordRef = useRef();
  const confirmedPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const designationRef = useRef();

  return (
    <View style={styles.container}>
      <BackButton navigation={props.navigation} route={"team_details"} />
      <HeaderText text="Inviting New Member" />
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 20 }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            <InputsContainer
              style={{
                height: globalHeight("150%"),
                width: Platform.OS === "web" ? "50%" : "90%",
              }}
            >
              <MainInput
                placeholder="User Name"
                onChangeText={(text) => setUserName(text)}
                textContentType="name-phone-pad"
                onEndEditing={() => {
                  emailRef.current.focus();
                }}
                autoCapitalize="words"
                rightIcon={() => (
                  <Ionicons name="person" size={24} color="black" />
                )}
              />

              <MainInput
                placeholder="Email Address"
                ref={emailRef}
                onEndEditing={() => {
                  confirmedEmailRef.current.focus();
                }}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                rightIcon={() => (
                  <Entypo name="email" size={24} color="black" />
                )}
                onBlur={handleBlur}
                onFocus={() => setIsValidEmail(true)}
                error="Invalid email address"
                showError={!isValidEmail}
              />
              <MainInput
                placeholder="Confirm Email Address"
                ref={confirmedEmailRef}
                onChangeText={(text) => setConfirmedEmail(text)}
                onFocus={() => setConfirmedEmailIsMatch(true)}
                keyboardType="email-address"
                rightIcon={() => (
                  <Entypo name="email" size={24} color="black" />
                )}
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
              <MainInput
                placeholder="First Name"
                onChangeText={(text) => setFirstName(text)}
                textContentType="name-phone-pad"
                ref={firstNameRef}
                onEndEditing={() => {
                  lastNameRef.current.focus();
                }}
              />
              <MainInput
                placeholder="Last Name"
                onChangeText={(text) => setLastName(text)}
                textContentType="name-phone-pad"
                ref={lastNameRef}
              />
              <View style={{ height: globalHeight("0.5%") }} />
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
                  style={[styles.listStyle, { width: "100%" }]}
                  textStyle={[
                    styles.dropText,
                    { fontSize: globalHeight("2%") },
                  ]}
                  listChildContainerStyle={{
                    borderRadius: 25,
                    borderColor: Colors.primary,
                  }}
                />
              </View>
              <MainInput
                placeholder="Phone Number"
                onChangeText={(text) => setPhoneNumber(text)}
                keyboardType="numeric"
                textContentType="telephoneNumber"
                ref={phoneNumberRef}
                onEndEditing={() => {
                  passwordRef.current.focus();
                }}
                rightIcon={() => {
                  return <Entypo name="phone" size={24} color="black" />;
                }}
              />

              <View style={{ height: globalHeight("0.5%") }} />
              <MainInput
                placeholder="Password"
                placeholderTextColor={"#6a6b6c"}
                onChangeText={(text) => setPassword(text)}
                textContentType="password"
                ref={passwordRef}
                onEndEditing={() => {
                  confirmedPasswordRef.current.focus();
                }}
                secureTextEntry={hidePassword}
                rightIcon={() => {
                  return (
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
                  );
                }}
              />
              <MainInput
                placeholder="Confirm Password"
                placeholderTextColor={"#6a6b6c"}
                onChangeText={(text) => setConfirmedPassword(text)}
                textContentType="password"
                ref={confirmedPasswordRef}
                onEndEditing={() => {
                  designationRef.current.focus();
                }}
                secureTextEntry={hidePassword}
                error="Password is Not Matching"
                showError={!confirmedPasswordMatch}
                onFocus={() => setConfirmedPasswordMatch(true)}
                rightIcon={() => {
                  return (
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
                  );
                }}
              />
              <MainInput
                placeholder="Designation"
                autoCapitalize="words"
                ref={designationRef}
                onEndEditing={register}
                placeholderTextColor={"#6a6b6c"}
                onChangeText={(text) => setDesignation(text)}
                textContentType="name-phone-pad"
                rightIcon={() => (
                  <FontAwesome5 name="critical-role" size={24} color="black" />
                )}
              />
              <View style={{ height: globalHeight("0.5%") }} />
              <Button
                title="Send Invitation"
                titleStyle={styles.title}
                onPress={register}
                buttonStyle={styles.buttonStyle}
              />
            </InputsContainer>
          </Fragment>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    fontFamily: "headers",
    fontSize: globalHeight("2.8%"),
    color: Colors.font,
    marginBottom: globalHeight("1%"),
    marginTop: globalHeight("1%"),
  },
  listStyle: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "100%",
    alignSelf: "center",
    borderWidth: 0,
    zIndex: 100,
  },
  singleInputContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: globalHeight("1.2%"),
    zIndex: 100,
    width: "100%",
  },
  dropText: {
    fontFamily: "headers",
    color: "black",
    fontSize: globalHeight("2%"),
  },
  row: {
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  flagContainer: {
    flexDirection: "row",
  },

  inputRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: globalWidth("100%") / 25,
  },
  buttonStyle: {
    width: Platform.OS === "web" ? globalWidth("30%") : globalWidth("70%"),
    borderRadius: 15,
    height: globalHeight("6%"),
    backgroundColor: "white",
    marginBottom: globalHeight("3%"),
  },
  title: {
    fontFamily: "headers",
    fontSize: globalHeight("2.5%"),
    color: Colors.font,
  },
  topContainer: {
    width: globalWidth("70%"),
    alignSelf: "center",
    marginLeft: 15,
  },
  forgotText: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: globalHeight("2%"),
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },
});

export default AddMemberScreen;
