import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Image, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import moment from "moment";
import numberWithComa from "../helpers/numberWithComa";

const ImageModal = (props) => {
  const {
    showReceipt,
    receiptAmount,
    receiptURL,
    receiptDate,
    receiptCurrency,
    closeReceipt,
  } = props;

  return (
    <Modal visible={showReceipt} style={styles.container} animationType="slide">
      <View style={styles.modalContainer}>
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.dateText}>
            Receipt Amount: {numberWithComa(receiptAmount)} {receiptCurrency}{" "}
          </Text>
          <Text style={styles.dateText}>
            Receipt Date: {moment(receiptDate).format("DD/MM/YYYY")}
          </Text>
          <Image
            source={{ uri: receiptURL }}
            style={{ width: "100%", height: globalHeight("60%") }}
          />
          <Button
            title="Close"
            onPress={closeReceipt}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.haizyColor,
  },
  modalContainer: {
    width: globalWidth("50%"),
    height: globalHeight("80%"),
    backgroundColor: Colors.haizyColor,
    borderColor: Colors.primary,
    borderWidth: 1.5,
    alignSelf: "center",
    marginTop: globalHeight("10%"),
  },
  buttonStyle: {
    backgroundColor: Colors.font,
    width: globalWidth("20%"),
    alignSelf: "center",
    marginTop: globalHeight("1%"),
  },
  titleStyle: {
    color: "white",
    fontFamily: "robotoRegular",
    fontSize: globalWidth("0.8%"),
  },
  dateText: {
    textAlign: "center",
    fontFamily: "robotoRegular",
    color: Colors.font,
    lineHeight: globalHeight("5%"),
  },
});

export default ImageModal;
