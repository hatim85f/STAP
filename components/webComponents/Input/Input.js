import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CustomInput = (props) => {
  return (
    <>
      <Input
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor={"#6a6b6c"}
        inputStyle={styles.inputStyle}
        onChangeText={props.onChangeText}
        textContentType={props.textContentType}
        inputContainerStyle={[styles.inputContainer, props.style]}
        onFocus={props.onFocus}
        secureTextEntry={props.secureTextEntry}
        onBlur={props.onBlur}
        onSubmitEditing={props.onSubmitEditing}
        rightIconContainerStyle={styles.rightIcon}
        rightIcon={props.rightIcon}
        leftIcon={props.leftIcon}
        renderErrorMessage={
          props.renderErrorMessage ? props.renderErrorMessage : undefined
        }
        {...props}
      />
      {props.showError && (
        <Text style={styles.errorMessage}> {props.error} </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: "headers",
    fontSize: wp("1%"),
    borderWidth: 0,
  },
  inputStyle: {
    border: "none",
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    borderWidth: 0,
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: wp("1%"),
  },
});

export default CustomInput;
