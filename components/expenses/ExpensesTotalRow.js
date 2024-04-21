import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import numberWithComa from "../helpers/numberWithComa";

import Card from "../Card";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

const ExpensesTotalRow = (props) => {
  const { totalValue, expenses, getSelectedCategory } = props;

  const [selectedCategory, setSelectedCategory] = useState("total");

  useEffect(() => {
    getSelectedCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <View
      style={[
        styles.container,
        { width: expenses.length * globalWidth("11%") + globalWidth("11%") },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.card,
          styles.touchable,
          {
            backgroundColor:
              selectedCategory === "total" ? Colors.haizyColor : "white",
          },
        ]}
        onPress={() => setSelectedCategory("total")}
      >
        <Text style={styles.cardTitle}> Total</Text>
        <Text style={styles.numbers}>
          {" "}
          {numberWithComa(totalValue)} {expenses[0].currency}{" "}
        </Text>
      </TouchableOpacity>
      {expenses.map((item, index) => {
        return (
          <TouchableOpacity
            style={[
              styles.card,
              styles.touchable,
              {
                backgroundColor:
                  selectedCategory === item.category
                    ? Colors.haizyColor
                    : "white",
              },
            ]}
            key={index}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === item.category ? "" : item.category
              )
            }
          >
            <Text style={styles.cardTitle}> {item.category} </Text>
            <Text style={styles.numbers}>
              {" "}
              {numberWithComa(item.amount)} {item.currency}{" "}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: globalHeight("2.5%"),
    marginHorizontal: globalWidth("2.5%"),
  },
  touchable: {
    shadowColor: "#6a6b6c",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
    backgroundColor: "white",
    borderColor: Colors.primary,
  },
  card: {
    width: globalWidth("10%"),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    height: globalHeight("7%"),
    padding: globalWidth("1%"),
  },
  cardTitle: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("1%"),
    color: Colors.font,
  },
  numbers: {
    fontFamily: "numbers",
    fontSize: globalWidth("1.2%"),
    color: Colors.primary,
    marginTop: globalHeight("0.5%"),
  },
});

export const ExpensesTotalRowOptions = (navData) => {
  return {
    headerTitle: "ExpensesTotalRow",
  };
};

export default ExpensesTotalRow;
