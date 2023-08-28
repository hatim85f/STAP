import React, { forwardRef, useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../constants/Colors";

const MainInput = forwardRef((props, ref) => {
  return (
    <>
      <Input
        ref={ref} // Forward the ref to the Input component
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
        keyboardType={props.keyboardType}
        onSubmitEditing={props.onSubmitEditing}
        rightIconContainerStyle={styles.rightIcon}
        rightIcon={props.rightIcon}
        leftIcon={props.leftIcon}
        label={props.label}
        labelStyle={styles.label}
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
});

const styles = StyleSheet.create({
  input: {
    fontFamily: "headers",
    fontSize: hp("2%"),
    color: Colors.font,
  },
  inputContainer: {},
  inputStyle: {},
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: hp("1.5%"),
  },
  label: {
    fontFamily: "headers",
    color: Colors.font,
  },
});

export default MainInput;
