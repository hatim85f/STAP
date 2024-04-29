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
        {target > 0 && (
          <View style={styles.salesContainer}>
            {!isNaN(target) && <Text style={styles.title}> Target</Text>}
            {!isNaN(target) && (
              <Text style={styles.title}>
                {" "}
                {numberWithComa(parseFloat(target).toFixed(2))} {currency}{" "}
              </Text>
            )}
          </View>
        )}
        <View style={styles.salesContainer}>
          {!isNaN(sales) && <Text style={styles.title}> Sales</Text>}
          {!isNaN(sales) && (
            <Text style={styles.title}>
              {" "}
              {numberWithComa(parseFloat(sales).toFixed(2))} {currency}{" "}
            </Text>
          )}
        </View>
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
    height: globalHeight("30%"),
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: globalHeight("3%"),
  },
  title: {
    fontSize: globalWidth("1%"),
    fontStyle: "italic",
    fontFamily: "roboto",
    lineHeight: globalWidth("2.5%"),
    fontWeight: "bold",
    color: "white",
  },
  salesContainer: {
    backgroundColor: "#54494B",
    padding: globalWidth("1%"),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const ItemsChartHomeOptions = (navData) => {
  return {
    headerTitle: "ItemsChartHome",
  };
};

export default ItemsChartHome;
