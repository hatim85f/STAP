import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import numberWithComa from "../helpers/numberWithComa";

const ItemsChartHome = (props) => {
  const { target, sales, currency } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sales Details</Text>
      <View style={styles.details}>
        {!isNaN(target) && (
          <Text style={styles.title}>
            {" "}
            Target : {numberWithComa(parseFloat(target).toFixed(2))} {currency}{" "}
          </Text>
        )}
        {!isNaN(sales) && (
          <Text style={styles.title}>
            {" "}
            Sales : {numberWithComa(parseFloat(sales).toFixed(2))} {currency}{" "}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30%",
    borderColor: "black",
    borderWidth: 1,
    padding: globalWidth("1%"),
    height: globalHeight("33%"),
    backgroundColor: "#FFFFF3",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 10,
    paddingBottom: 0,
  },
  header: {
    fontSize: globalWidth("1.8% "),
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  details: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: globalWidth("1.1%"),
    fontStyle: "italic",
    fontFamily: "Helvetica",
    lineHeight: globalWidth("2.5%"),
    fontWeight: "bold",
  },
});

export const ItemsChartHomeOptions = (navData) => {
  return {
    headerTitle: "ItemsChartHome",
  };
};

export default ItemsChartHome;
