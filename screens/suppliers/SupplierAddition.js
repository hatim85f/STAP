import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/webComponents/Input/Input";

import * as authActions from "../../store/auth/authActions";

import {
  MaterialIcons,
  Entypo,
  Ionicons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import * as supplierActions from "../../store/suppliers/suppliersActions";

const SupplierAddition = (props) => {
  const [supplierName, setSupplierName] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [supplierCity, setSupplierCity] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPersonPhone, setContactPersonPhone] = useState("");
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState("");
  const [currency, setCurrency] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkIsEmail = (email) => {
    const isEmail = email.includes("@") && email.includes(".");

    if (isEmail) {
      setEmailHasError(false);
      setSupplierEmail(email);
    } else {
      setEmailHasError(true);
    }
  };

  const dispatch = useDispatch();

  const submit = () => {
    setIsLoading(true);
    dispatch(
      supplierActions.addSupplier(
        supplierName,
        supplierEmail,
        supplierPhone,
        supplierAddress,
        supplierCity,
        contactPerson,
        contactPersonPhone,
        contactPersonEmail,
        paymentPeriod,
        currency
      )
    ).then(() => {
      setIsLoading(false);
      setSupplierName("");
      setSupplierEmail("");
      setSupplierPhone("");
      setSupplierAddress("");
      setSupplierCity("");
      setContactPerson("");
      setContactPersonPhone("");
      setContactPersonEmail("");
      setPaymentPeriod("");
      setCurrency("");
    });
  };

  //=========================================================GET USER BACK========================================================

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails = window.localStorage.getItem("userDetails");

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

  return (
    <View style={styles.container}>
      <View style={styles.mainRow}>
        <View style={styles.contentContainer}>
          <CustomInput
            style={styles.input}
            placeholder={"Supplier Name"}
            onChangeText={(text) => setSupplierName(text)}
            rightIcon={
              <MaterialIcons
                name="drive-file-rename-outline"
                size={globalWidth("1.5%")}
                color="black"
              />
            }
          />
          <CustomInput
            style={styles.input}
            placeholder={"Supplier Email"}
            onChangeText={(text) => setSupplierEmail(text)}
            onBlur={() => checkIsEmail(supplierEmail)}
            showError={emailHasError}
            error={"Invalid Email"}
            onFocus={() => setEmailHasError(false)}
            rightIcon={
              <Entypo name="email" size={globalWidth("1.5%")} color="black" />
            }
          />
          <CustomInput
            style={styles.input}
            placeholder={"Supplier Phone"}
            onChangeText={(text) => setSupplierPhone(text)}
            rightIcon={
              <MaterialIcons
                name="phone"
                size={globalWidth("1.5%")}
                color="black"
              />
            }
          />
          <CustomInput
            style={styles.input}
            placeholder={"Supplier Address"}
            onChangeText={(text) => setSupplierAddress(text)}
            rightIcon={
              <MaterialIcons
                name="location-on"
                size={globalWidth("1.5%")}
                color="black"
              />
            }
          />
          <CustomInput
            style={styles.input}
            placeholder={"Supplier City"}
            onChangeText={(text) => setSupplierCity(text)}
            rightIcon={
              <MaterialIcons
                name="location-city"
                size={globalWidth("1.5%")}
                color="black"
              />
            }
          />
        </View>
        <View style={styles.contentContainer}>
          <CustomInput
            style={styles.input}
            placeholder={"Contact Person"}
            onChangeText={(text) => setContactPerson(text)}
            rightIcon={
              <MaterialIcons
                name="person"
                size={globalWidth("1.5%")}
                color="black"
              />
            }
          />
          <CustomInput
            style={styles.input}
            placeholder={"Contact Person Phone"}
            onChangeText={(text) => setContactPersonPhone(text)}
            rightIcon={
              <MaterialIcons
                name="phone"
                size={globalWidth("1.5%")}
                color="black"
              />
            }
          />
          <CustomInput
            style={styles.input}
            placeholder={"Contact Person Email"}
            onChangeText={(text) => setContactPersonEmail(text)}
            rightIcon={
              <Entypo name="email" size={globalWidth("1.5%")} color="black" />
            }
          />
          <CustomInput
            style={styles.input}
            placeholder={"Payment Period"}
            onChangeText={(text) => setPaymentPeriod(text)}
            rightIcon={
              <Ionicons
                name="calendar"
                size={globalWidth("1.5%")}
                color="black"
              />
            }
          />
          <CustomInput
            style={styles.input}
            placeholder={"Currency"}
            onChangeText={(text) => setCurrency(text)}
            rightIcon={
              <FontAwesome5
                name="money-bill-wave"
                size={globalWidth("1.5%")}
                color="black"
              />
            }
          />
        </View>
      </View>
      <Button
        title="Submit"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={submit}
        loading={isLoading}
        disabled={
          isLoading ||
          emailHasError ||
          !supplierName ||
          !supplierEmail ||
          !supplierPhone ||
          !supplierAddress ||
          !supplierCity ||
          !contactPerson ||
          !contactPersonPhone ||
          !contactPersonEmail ||
          !paymentPeriod ||
          !currency
        }
        disabledStyle={{ backgroundColor: Colors.primary }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: globalHeight("2%"),
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  contentContainer: {
    width: "48%",
    borderRadius: 10,
    padding: globalHeight("2%"),
    borderWidth: 1,
    borderColor: "black",
  },
  button: {
    width: "20%",
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginTop: globalHeight("4%"),
  },
  titleStyle: {
    fontSize: globalWidth("2%"),
    color: "white",
    fontFamily: "open-sans-bold",
  },
});

export const SupplierAdditionOptions = (navData) => {
  return {
    headerTitle: "SupplierAddition",
  };
};

export default SupplierAddition;
