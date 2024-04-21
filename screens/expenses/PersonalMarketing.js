import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalWidth, globalHeight } from "../../constants/globalWidth";

import { Octicons } from "@expo/vector-icons";
import numberWithComa from "../../components/helpers/numberWithComa";
import Colors from "../../constants/Colors";
import * as Progress from "react-native-progress";

const PersonalMarketing = (props) => {
  const { expenses } = props;

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedPercent, setSelectedPercent] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [personArranged, setPersonArranged] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

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

  useEffect(() => {
    const arrangedPerson = expenses.reduce((acc, expense) => {
      const found = acc.find(
        (item) => item.requestedBy === expense.requestedBy
      );

      if (!found) {
        acc.push({
          requestedBy: expense.requestedBy,
          amount: expense.amount,
          currency: expense.currency,
        });
      } else {
        found.amount += expense.amount;
      }

      return acc;
    }, []);

    setPersonArranged(arrangedPerson);

    const totalAmount = expenses.map((a) => a.amount);
    const totalValue = totalAmount.reduce((a, b) => a + b, 0);
    setTotalValue(totalValue);
  }, [expenses]);

  useEffect(() => {
    if (selectedPerson && totalValue) {
      const selectedExpenses = personArranged.find(
        (expense) => expense.requestedBy === selectedPerson
      );

      const selectedPercent = (selectedExpenses.amount / totalValue) * 100;
      setSelectedPercent(selectedPercent.toFixed(0));

      const remaining = 100 - selectedPercent;
      setRemaining(remaining);
    }
  }, [selectedPerson]);

  return (
    <View style={styles.container}>
      <FlatList
        data={personArranged}
        keyExtractor={(item) => item.requestedBy}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemMainContainer}>
              <View style={styles.itemContainer}>
                <View style={styles.nameRow}>
                  <Octicons
                    name="dot-fill"
                    size={globalWidth("1%")}
                    color={itemColors[index]}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setSelectedPerson(
                        selectedPercent === item.requestedBy
                          ? null
                          : item.requestedBy
                      )
                    }
                  >
                    <Text style={[[styles.name]]}> {item.requestedBy} </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.values}>
                  <Text style={styles.percentText}>
                    {((item.amount / totalValue) * 100).toFixed(0)}%
                  </Text>

                  <Text style={styles.valueText}>
                    {" "}
                    {numberWithComa(item.amount)} {item.currency}{" "}
                  </Text>
                </View>
              </View>
              <Progress.Bar
                progress={parseFloat(
                  ((item.amount / totalValue).toFixed(2) * 100) / 100
                )}
                width={globalWidth("18.5%")}
                height={globalHeight("1.5%")}
                color={itemColors[index]}
                style={{
                  borderRadius: 50,
                  borderWidth: 0,
                  marginTop: globalHeight("1%"),
                }}
                animated={true}
                unfilledColor="#f2f2f2"
                showText={true}
                textStyle={{ fontSize: globalWidth("1%") }}
                formatText={(progress) =>
                  `${parseFloat(
                    ((item.amount / totalValue).toFixed(2) * 100) / 100
                  )}%`
                }
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#ccc",
    borderWidth: 1.5,
    borderRadius: 10,
    height: "100%",
    width: "30%",
    padding: globalWidth("2%"),
    maxHeight: globalHeight("40%"),
  },
  itemMainContainer: {
    borderBottomColor: Colors.second,
    borderBottomWidth: 1.5,
    paddingBottom: globalWidth("1"),
    paddingTop: globalWidth("1"),
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("1%"),
    fontStyle: "italic",
    color: "#888",
  },
  values: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  percentText: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("1%"),
    color: "#000",
    fontWeight: "bold",
  },
  valueText: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("1%"),
    fontStyle: "italic",
    color: "#888",
  },
});

export default PersonalMarketing;
