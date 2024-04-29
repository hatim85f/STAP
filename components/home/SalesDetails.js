import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import numberWithComa from "../helpers/numberWithComa";

const SalesDetails = (props) => {
  const { performanceData } = props;

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.sn}>
          <Text style={styles.data}>SN</Text>
        </View>
        <View style={[styles.details, { width: "35%" }]}>
          <Text style={styles.data}>Item</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.data}>Qty</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.data}>Price</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.data}>Total</Text>
        </View>
      </View>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {performanceData?.map((item, index) => {
          return (
            <View
              style={[
                styles.headerView,
                { backgroundColor: index % 2 === 0 ? "#FFFFF3" : "#F0F0F0" },
              ]}
              key={index}
            >
              <View style={styles.sn}>
                <Text style={[styles.data, styles.itemData]}>{index + 1}</Text>
              </View>
              <View style={[styles.details, { width: "35%" }]}>
                <Text style={[styles.data, styles.itemData]}>
                  {item.productNickName}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.data, styles.itemData]}>
                  {numberWithComa(parseFloat(item.quantity).toFixed(0))}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.data, styles.itemData]}>
                  {numberWithComa(parseFloat(item.sellingPrice).toFixed(0))}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.data, styles.itemData]}>
                  {numberWithComa(parseFloat(item.salesValue).toFixed(0))}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "28%",
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
    borderTopRightRadius: 10,
    paddingBottom: 0,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.primary,
  },
  data: {
    color: "white",
    fontFamily: "open-sans-bold",
    fontSize: globalWidth("0.8%"),
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
  },
  sn: {
    justifyContent: "center",
    alignItems: "center",
    height: globalHeight("3.5%"),
    width: "6%",
  },
  details: {
    justifyContent: "center",
    alignItems: "center",
    height: globalHeight("3.5%"),
    width: "20%",
  },
  itemData: {
    color: Colors.font,
    fontWeight: "normal",
  },
});

export default SalesDetails;
