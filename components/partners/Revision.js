import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import * as partnerActions from "../../store/partners/partnersActions";

const Revision = (props) => {
  const {
    businessId,
    businessName,
    firstName,
    lastName,
    email,
    phoneNumber,
    profileImage,
    address,
    DOB,
    idType,
    idImage,
    idNumber,
    idExpiryDate,
    bankName,
    bankIBAN,
    investementAmount,
    percentage,
    dateOfStart,
    responsibilities,
    password,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const dispatch = useDispatch();

  const submitHandler = () => {
    setIsLoading(true);
    setLoadingMessage(
      "Congratulations! Your partner request is being submitted"
    );
    dispatch(
      partnerActions.addPartner(
        businessId,
        firstName + " " + lastName,
        email,
        phoneNumber,
        profileImage,
        address,
        idType,
        idImage,
        idNumber,
        idExpiryDate,
        bankName,
        bankIBAN,
        percentage,
        dateOfStart,
        responsibilities,
        investementAmount,
        DOB,
        password
      )
    ).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <Text style={styles.mainText}>
          Business Name: <Text style={styles.subText}>{businessName}</Text>
        </Text>
        <Text style={styles.mainText}>
          Partner Name:{" "}
          <Text style={styles.subText}>
            {" "}
            {firstName} {lastName}{" "}
          </Text>{" "}
        </Text>
        <Text style={styles.mainText}>
          Email: <Text style={styles.subText}>{email}</Text>
        </Text>
        <Text style={styles.mainText}>
          Phone: <Text style={styles.subText}>{phoneNumber}</Text>
        </Text>
        <Text style={styles.mainText}>
          Address: <Text style={styles.subText}>{address}</Text>
        </Text>
        <Text style={styles.mainText}>
          Date of Birth: <Text style={styles.subText}>{DOB}</Text>
        </Text>
        <Text style={styles.mainText}>
          ID Type: <Text style={styles.subText}>{idType}</Text>
        </Text>
        <Text style={styles.mainText}>
          ID Number: <Text style={styles.subText}>{idNumber}</Text>
        </Text>
      </View>
      <View style={styles.innerView}>
        <Text style={styles.mainText}>
          ID Expiry Date: <Text style={styles.subText}>{idExpiryDate}</Text>
        </Text>
        <Text style={styles.mainText}>
          Bank Name: <Text style={styles.subText}>{bankName}</Text>
        </Text>
        <Text style={styles.mainText}>
          Bank IBAN: <Text style={styles.subText}>{bankIBAN}</Text>
        </Text>
        <Text style={styles.mainText}>
          Investment Amount:{" "}
          <Text style={styles.subText}>{investementAmount}</Text>
        </Text>
        <Text style={styles.mainText}>
          Percentage: <Text style={styles.subText}>{percentage} %</Text>
        </Text>
        <Text style={styles.mainText}>
          Date of Start: <Text style={styles.subText}>{dateOfStart}</Text>
        </Text>
        {responsibilities &&
          responsibilities.length > 0 &&
          responsibilities.map((responsibility, index) => {
            return (
              <Text style={styles.mainText} key={index}>
                Responsibility {index + 1}:{" "}
                <Text style={styles.subText}>{responsibility}</Text>
              </Text>
            );
          })}
        {isLoading ? (
          <View
            style={[
              styles.button,
              {
                height: globalHeight("4%"),
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        ) : (
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.title}
            title="Submit"
            onPress={submitHandler}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "98%",
    alignSelf: "center",
  },
  innerView: {
    width: "48.5%",
    borderRadius: 10,
    borderColor: Colors.font,
    borderWidth: 1.5,
    padding: globalWidth("2%"),
  },
  mainText: {
    fontSize: globalWidth("1.1%"),
    fontFamily: "Poppins-Medium",
    color: Colors.font,
    lineHeight: globalWidth("3%"),
  },
  subText: {
    fontSize: globalWidth("1.1%"),
    fontFamily: "Poppins-Regular",
    color: Colors.appBlue,
  },
  button: {
    backgroundColor: "transparent",
    width: "40%",
    borderRadius: 10,
    borderWidth: 1.5,
    color: Colors.font,
    alignSelf: "center",
  },
  title: {
    fontSize: globalWidth("1.1%"),
    fontFamily: "Poppins-Medium",
    color: Colors.font,
  },
});

export default Revision;
