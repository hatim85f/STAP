import React from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Card from "../Card";
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/auth/authActions";
const ErrorModal = () => {
  const { error, errorMessage, showError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const clearError = () => {
    dispatch(authActions.clearError());
  };

  return (
    <Modal visible={showError} animationType="slide" style={styles.modalStyle}>
      <View style={styles.modalStyle}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.errorTitle}> {error} </Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{errorMessage}</Text>
          </View>
          <View
            style={[
              styles.header,
              { alignItems: "flex-end", height: hp("5%") },
            ]}
          >
            <Button
              title="Ok"
              buttonStyle={styles.button}
              titleStyle={styles.title}
              onPress={clearError}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    height: hp("100%"),
    width: wp("100%"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(200, 211, 213, 0.8)",
  },
  card: {
    height: hp("40%"),
    width: hp("80%"),
    overflow: "hidden",
  },
  header: {
    backgroundColor: Colors.primary,
    height: hp("7%"),
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  errorTitle: {
    fontSize: wp("2%"),
    color: "white",
    fontFamily: "headers",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(135, 0, 243, 0.18)",
  },
  message: {
    fontSize: wp("1.5%"),
    color: Colors.font,
    fontFamily: "headers",
    textAlign: "center",
  },
  button: {
    height: hp("5%"),
    width: wp("8%"),
    backgroundColor: "transaprent",
  },
  title: {
    color: "white",
    fontFamily: "headers",
    fontSize: wp("1%"),
  },
});

export default ErrorModal;
