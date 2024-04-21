import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import numberWithComa from "../../components/helpers/numberWithComa";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";

const MarketingList = (props) => {
  const { expenses, month, year } = props;

  // set an array of 20 colors to be used for the items
  const itemColors = [
    "#17B890",
    "#5E807F",
    "#ED6A5E",
    "#B36A5E",
    "#22333B",
    "#0A0908",
    "#721121",
    "#D7263D",
    "#FF570A",
    "#FF8C00",
    "#FFC300",
    "#FFD700",
    "#E6E200",
    "#AAAC84",
    "#808000",
    "#556B2F",
    "#2E4600",
    "#004225",
    "#2B2D42",
    "#8D99AE",
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View
              style={[
                styles.itemMainContainer,
                {
                  borderBottomWidth: index === expenses.length - 1 ? 0 : 1.5,
                },
              ]}
            >
              <View style={styles.nameRow}>
                <View style={[styles.smallRow, { width: "30%" }]}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.productImage }}
                  />
                  <Text style={styles.name}> {item.requestedBy} </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.numbers}>
                    {" "}
                    {numberWithComa(item.amount)} {item.currency}{" "}
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.name}> {item.kindOfExpense} </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.name}> {item.status} </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    (window.location.href = `/expenses_actions/${item._id}/${month}/${year}`)
                  }
                  style={{ padding: globalWidth("1%"), width: "10%" }}
                >
                  <Entypo name="chevron-small-right" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: globalHeight("2%"),
    padding: globalWidth("1%"),
  },
  itemMainContainer: {
    borderBlockColor: Colors.second,
    borderBottomWidth: 1.5,
    paddingVertical: globalHeight("1%"),
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: globalWidth("1%"),
  },
  image: {
    width: globalWidth("3 %"),
    height: globalWidth("3 %"),
    borderRadius: globalWidth("1.5%"),
    borderColor: "black",
    borderWidth: 1,
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: globalWidth("0.9%"),
    color: Colors.font,
    fontFamily: "robotoRegular",
    marginLeft: globalWidth("0.5%"),
  },
  numbers: {
    fontFamily: "numbers",
    fontSize: globalWidth("0.9%"),
  },
  details: {
    fontSize: globalWidth("0.9%"),
    color: Colors.second,
    fontFamily: "robotoRegular",
    marginLeft: globalWidth("1%"),
    lineHeight: globalHeight("4%"),
  },
});

export const MarketingListOptions = (navData) => {
  return {
    headerTitle: "MarketingList",
  };
};

export default MarketingList;
