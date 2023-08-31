import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import * as productsActions from "../../store/products/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "react-native";
import { Avatar } from "react-native-elements";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import numberWithComma from "../helpers/numberWithComa";
import { Dimensions } from "react-native";

const isTablet = () => {
  const { width, height } = Dimensions.get("window");
  if (Platform.OS === "ios") {
    return width > 768 && height > 1024;
  } else if (Platform.OS === "android") {
    console.log(width, height);
    return width > 500 && height > 700;
  }
  return false; // Default case
};

const ProductsShow = (props) => {
  const { products } = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <View style={styles.mainRow}>
                <View style={{ width: "33%" }}>
                  <Avatar
                    source={{ uri: item.imageURL }}
                    size={Platform.OS === "web" ? "large" : "medium"}
                    rounded
                    avatarStyle={styles.image}
                  />
                </View>
                <View style={{ width: "33%" }}>
                  <Text style={styles.title}>{item.productNickName}</Text>
                </View>
                <View style={{ width: "33%" }}>
                  <Text style={styles.title}>
                    {" "}
                    Price :{" "}
                    <Text style={styles.numbers}>
                      {numberWithComma(item.sellingPrice)}
                    </Text>{" "}
                  </Text>
                </View>
              </View>
              <Text style={styles.description}> {item.description} </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: -100,
  },
  itemContainer: {
    borderBottomColor: Colors.font,
    borderBottomWidth: 1,
    width: Platform.OS === "web" ? globalWidth("80%") : globalWidth("90%"),
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  title: {
    fontSize:
      Platform.OS === "web"
        ? globalWidth("1.5%")
        : Platform.isPad
        ? globalWidth("3%")
        : isTablet()
        ? globalWidth("2.5%")
        : globalWidth("4%"),
    fontFamily: "headers",
    color: Colors.font,
  },
  numbers: {
    fontFamily: "numbers",
  },
  description: {
    marginTop: 10,
    textAlign: "center",
    marginBottom: 10,
    fontSize:
      Platform.OS === "web"
        ? globalWidth("1.5%")
        : Platform.isPad
        ? globalWidth("3%")
        : isTablet()
        ? globalWidth("2.5%")
        : globalWidth("4%"),
    color: "#000",
  },
});

export default ProductsShow;
