import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const BankDetails = (props) => {
  const { getBankName, getBankIBAN } = props;

  const [bankName, setBankName] = useState("");
  const [bankIBAN, setBankIBAN] = useState("");

  useEffect(() => {
    if (bankName) {
      getBankName(bankName);
    }
  }, [bankName]);

  useEffect(() => {
    if (bankIBAN) {
      getBankIBAN(bankIBAN);
    }
  }, [bankIBAN]);

  return (
    <View style={styles.container}>
      <Input
        label="Bank Name"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        onChangeText={(text) => setBankName(text)}
        rightIcon={
          <MaterialCommunityIcons
            name="bank"
            size={24}
            color={Colors.font}
            style={styles.icon}
          />
        }
        rightIconContainerStyle={styles.icon}
      />
      <Input
        label="IBAN"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        onChangeText={(text) => setBankIBAN(text)}
        rightIcon={
          <MaterialCommunityIcons
            name="bank-transfer"
            size={24}
            color={Colors.font}
            style={styles.icon}
          />
        }
        rightIconContainerStyle={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    alignSelf: "center",
    width: "40%",
    alignSelf: "center",
    marginVertical: globalHeight("2%"),
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

export default BankDetails;
