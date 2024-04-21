import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import { AntDesign } from "@expo/vector-icons";
import ColumnChart from "../../components/charts/ColumnChart";
import { ScrollView } from "react-native-gesture-handler";
import numberWithComa from "../../components/helpers/numberWithComa";

const PorductsDetails = (props) => {
  const { products, totalProfit, currencySymbol } = props;

  const [maxScrollNumber, setMaxScrollNumber] = useState(
    products.length > 3 ? products.length - 3 : 0
  );
  const [scrollWidth, setScrollWidth] = useState(globalWidth("2%"));

  const scrollViewRef = useRef(null);

  const scrollLeft = () => {
    setMaxScrollNumber(products.length - 1);
    setScrollWidth(globalWidth("2%"));

    scrollViewRef.current?.scrollTo({
      x: (scrollViewRef.current?.scrollX || 0) - scrollWidth,
      animated: true,
    });
  };

  const scrollRight = () => {
    let newMaxScrollNumber = maxScrollNumber;

    if (newMaxScrollNumber === 0) {
      return;
    }

    setMaxScrollNumber(newMaxScrollNumber - 1);

    const newScrollWidth = scrollWidth;
    const appliedWidth = newScrollWidth + globalWidth("20%");
    setScrollWidth(appliedWidth);

    scrollViewRef.current?.scrollTo({
      x: (scrollViewRef.current?.scrollX || 0) + appliedWidth,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products Performance</Text>
      <View style={styles.mainRow}>
        <TouchableOpacity onPress={scrollLeft} style={styles.arrowContainer}>
          <AntDesign
            name="caretleft"
            size={globalWidth("2%")}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <ScrollView
          horizontal={true}
          scrollEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: globalWidth("55%") }}
          ref={scrollViewRef}
        >
          {products.map((product, index) => {
            return (
              <View key={index} style={styles.itemContainer}>
                <Image
                  source={{ uri: product.imageURL }}
                  style={styles.image}
                />
                <Text style={styles.itemName}> {product.productName} </Text>
                <ColumnChart
                  categories={["Cost", "Marketing", "Sales", "Profit"]}
                  data={[
                    parseFloat(product.totalCostPrice).toFixed(0),
                    parseFloat(product.marketingExpenses).toFixed(0),
                    parseFloat(product.salesValue).toFixed(0),
                    parseFloat(product.productProfit).toFixed(0),
                  ]}
                  width={globalWidth("15%")}
                  height={globalHeight("20%")}
                />
                <Text style={styles.data}>
                  Profit :{" "}
                  <Text style={styles.colored}>
                    {" "}
                    {numberWithComa(
                      parseFloat(product.productProfit).toFixed(2)
                    )}{" "}
                    {product.currencySymbol}
                  </Text>
                </Text>
                <Text style={styles.data}>
                  Available QTY :{" "}
                  <Text style={styles.colored}>
                    {" "}
                    {numberWithComa(+product.inventory)}{" "}
                  </Text>
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={scrollRight}
          style={styles.arrowContainer}
          disabled={maxScrollNumber > 0 && maxScrollNumber < 1}
        >
          <AntDesign
            name="caretright"
            size={globalWidth("2%")}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.profit}>
        {" "}
        Total Profit :{" "}
        <Text style={styles.colored}> {numberWithComa(totalProfit)} </Text>{" "}
        {currencySymbol}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: globalWidth("65%"),
    borderWidth: 1,
    borderColor: "black",
    padding: globalWidth("1%"),
    borderRadius: 3,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: "100%",
  },
  header: {
    fontFamily: "openSansBold",
    fontSize: globalWidth("1.5%"),
    color: Colors.appBlue,
    marginBottom: globalHeight("1%"),
    fontStyle: "italic",
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  arrowContainer: {
    width: globalWidth("2.5%"),
    height: globalWidth("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    width: globalWidth("18%"),
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: globalWidth("1%"),
    borderRadius: 3,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: globalWidth("1%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  image: {
    width: globalWidth("4%"),
    height: globalWidth("4%"),
    borderRadius: globalWidth("2%"),
    borderWidth: 0.5,
    borderColor: Colors.font,
    marginBottom: globalHeight("0.5%"),
  },
  itemName: {
    fontFamily: "openSansBold",
    fontSize: globalWidth("1%"),
    color: Colors.font,
    marginBottom: globalHeight("0.5%"),
    fontStyle: "italic",
  },
  data: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("0.8%"),
    color: Colors.font,
    fontStyle: "italic",
    marginTop: globalHeight("0.5%"),
  },
  colored: {
    color: Colors.primary,
  },
  profit: {
    fontFamily: "openSansBold",
    fontSize: globalWidth("1.1%"),
    color: Colors.font,
    marginTop: globalHeight("1%"),
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default PorductsDetails;
