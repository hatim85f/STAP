import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import ContactsData from "./ContactsData";
import MenuButton from "../../components/webComponents/menu/MenuButton";

import * as formsActions from "../../store/contact/contactActions";
import * as authActions from "../../store/auth/authActions";

const ContactUs = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  // getting user back if he is logged out for any reason except he pressed logout button
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        storedUserDetails = window.localStorage.getItem("userDetails");
        if (storedUserDetails) {
          const parsedUserDetails = JSON.parse(storedUserDetails);

          if (parsedUserDetails.user) {
            dispatch(authActions.getUserIn(parsedUserDetails));
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  const submit = () => {
    if (title.length < 5) {
      setShowError(true);
      setErrorMessage("Title should be at least 5 characters");
      return;
    } else if (description.length < 10) {
      setShowError(true);
      setErrorMessage("Description should be at least 10 characters");
      return;
    } else if (!title || !description) {
      setShowError(true);
      setErrorMessage("Please fill all the fields");
      return;
    } else {
      setShowError(false);
    }

    setIsLoading(true);
    dispatch(formsActions.sendContact(title, description)).then(() => {
      setIsLoading(false);
      setTitle("");
      setDescription("");
    });
  };

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <View style={styles.mainRow}>
        <View style={styles.leftView}></View>
        <View style={styles.contactContainer}>
          <ContactsData />
          <View style={styles.formContainer}>
            <Text style={styles.header}>Contact Us</Text>
            <Input
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={styles.input}
              containerStyle={styles.inputContainer}
            />
            <View style={styles.inputContainer}>
              <textarea
                placeholder="Description"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.input}
                containerStyle={styles.inputContainer}
                wrap="soft"
              />
            </View>
            {isLoading ? (
              <View
                style={[
                  styles.button,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <ActivityIndicator size="small" color={Colors.primary} />
              </View>
            ) : (
              <Button
                title="Submit"
                onPress={submit}
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
              />
            )}
            {
              // Error message
              showError ? (
                <Text style={styles.errorMessage}> * {errorMessage}</Text>
              ) : null
            }
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftView: {
    backgroundColor: Colors.primary,
    width: globalWidth("20%"),
    height: globalHeight("100%"),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
  contactContainer: {
    width: "80%",
    height: globalHeight("100%"),
  },
  formContainer: {
    width: globalWidth("45%"),
    alignSelf: "center",
    flexDirection: "column",
    borderRadius: 10,
    marginTop: -globalWidth("1.5%"),
    backgroundColor: Colors.primary,
    paddingVertical: globalWidth("5%"),
    zIndex: -100,
  },
  header: {
    fontFamily: "headers",
    fontSize: globalWidth("2%"),
    textAlign: "center",
    color: "white",
  },
  input: {
    color: Colors.primary,
    fontSize: globalWidth("1%"),
    fontFamily: "numbers",
  },
  inputContainer: {
    width: globalWidth("40%"),
    alignSelf: "center",
    marginBottom: globalWidth("3%"),
    backgroundColor: "white",
    marginTop: globalWidth("1%"),
    borderRadius: 10,
  },
  button: {
    width: globalWidth("10%"),
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: globalHeight("5%"),
  },
  buttonTitle: {
    color: Colors.primary,
    fontSize: globalWidth("1%"),
    fontFamily: "numbers",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontFamily: "numbers",
    fontSize: globalWidth("1%"),
    marginTop: globalWidth("1%"),
  },
});

export default ContactUs;
