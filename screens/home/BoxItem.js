import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import numberWithComa from "../../components/helpers/numberWithComa";

const BoxItem = (props) => {
  const { itemValue, totalValue, title } = props;

  return (
    <View style={styles.box}>
      <View style={styles.innerRow}>
        {(itemValue / totalValue) * 100 > 50 ? (
          <AntDesign name="caretup" size={globalWidth("1.5%")} color="red" />
        ) : (
          <AntDesign
            name="caretdown"
            size={globalWidth("1.5%")}
            color="green"
          />
        )}
        <Text style={styles.percent}>
          {isNaN((itemValue / totalValue) * 100)
            ? "0"
            : ((itemValue / totalValue) * 100).toFixed(2)}
          %
        </Text>
      </View>
      <Text style={styles.title}> {title} </Text>
      <Text style={styles.numbers}>
        {" "}
        Value :{" "}
        <Text style={styles.colored}>
          {numberWithComa(parseFloat(itemValue).toFixed(0))}{" "}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: globalWidth("14%"),
    height: globalWidth("8.5%"),
    borderWidth: 1,
    borderColor: "black",
    padding: globalWidth("1%"),
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 5,
    marginVertical: globalWidth("0.25%"),
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  percent: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("1%"),
    color: "black",
    fontStyle: "italic",
  },
  title: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("1%"),
    color: "black",
    fontStyle: "italic",
  },
  numbers: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("1%"),
    color: "black",
    fontStyle: "italic",
  },
  colored: {
    color: Colors.primary,
  },
});

export const BoxItemOptions = (navData) => {
  return {
    headerTitle: "BoxItem",
  };
};

export default BoxItem;
