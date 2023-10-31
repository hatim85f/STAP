import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Modal } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Card from "../Card";
import Colors from "../../constants/Colors";

const WebAlert = (props) => {
  const { showAlert } = props;
  return (
    <Modal
      style={{
        backgroundColor: "red",
      }}
      animationType="slide"
      visible={showAlert}
    >
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>
              {props.title ? props.title : "Alert"}
            </Text>
          </View>
          <View style={styles.middleContet}>
            <Text style={styles.text}>{props.message}</Text>
          </View>
          <View style={styles.lowerRow}>
            <Button
              title={props.cancelText}
              buttonStyle={styles.button}
              titleStyle={styles.titleStyle}
              onPress={props.onCancel}
            />
            <Button
              title={props.okText}
              buttonStyle={styles.button}
              titleStyle={styles.titleStyle}
              onPress={props.onOk}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: globalWidth("100%"),
    height: globalHeight("100%"),
    backgroundColor: "rgba(135, 0, 243, 0.18)",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {},
  card: {
    height: globalHeight("30%"),
    width: globalWidth("40%"),
    overflow: "hidden",
    borderWidth: 1.5,
    alignSelf: "center",
  },
  cardHeader: {
    backgroundColor: Colors.primary,
    padding: 10,
    height: "18%",
    justifyContent: "center",
  },
  cardHeaderText: {
    color: "white",
    fontSize: globalWidth("1%"),
    fontFamily: "headers",
  },
  middleContet: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: globalWidth("1%"),
    color: Colors.font,
  },
  lowerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "25%",
  },
  button: {
    width: "100%",
    height: globalHeight("3%"),
    backgroundColor: "white",
    borderRadius: 25,
  },
  titleStyle: {
    fontFamily: "headers",
    color: Colors.font,
    fontSize: globalWidth("1%"),
  },
});

export default WebAlert;
