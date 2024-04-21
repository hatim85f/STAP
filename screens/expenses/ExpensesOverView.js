import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import numberWithComa from "../../components/helpers/numberWithComa";

import { Feather } from "@expo/vector-icons";

const ExpensesOverView = (props) => {
  const { expenses, previousExpenses } = props;

  const [totalValue, setTotalValue] = useState(0);
  const [totalDifference, setTotalDifference] = useState(null);
  const [claimedDifference, setClaimedDifference] = useState(null);
  const [averageDifference, setAverageDifference] = useState(null);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const expensesAmounts = expenses.map((a) => a.amount);
    const totalValue = expensesAmounts.reduce((a, b) => a + b, 0);
    setTotalValue(totalValue);

    const totalDifference = totalValue / previousExpenses.totalAmount - 1;
    setTotalDifference(totalDifference.toFixed(2) * 100);
  }, [expenses]);

  useEffect(() => {
    const average = totalValue / expenses.length;
    const previousAverage =
      previousExpenses.totalAmount /
      previousExpenses.numberOfPreviousMonthExpenses;
    const averageDifference = average / previousAverage - 1;
    setAverage(average);
    setAverageDifference(averageDifference.toFixed(2) * 100);

    const currentClaimed = expenses.filter((a) => a.isClaimed === true).length;
    const claimedDifference =
      currentClaimed / previousExpenses.numberOfClaimedExpenses - 1;

    setClaimedDifference(claimedDifference.toFixed(2) * 100);
  }, [previousExpenses, expenses]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Overview</Text>
      <View style={styles.cotnainerRow}>
        <View style={styles.card}>
          <Text style={styles.title}>Total</Text>
          <Text style={styles.number}>
            {numberWithComa(totalValue)} {expenses[0].currency}
          </Text>
          {!isNaN(totalDifference) && (
            <View style={styles.innerRow}>
              <View
                style={[
                  styles.differenceContainer,
                  {
                    backgroundColor:
                      totalDifference < 0
                        ? "rgba(255, 0, 0, 0.1)"
                        : "rgba(37, 211, 102, 0.1)",
                  },
                ]}
              >
                {totalDifference < 0 ? (
                  <Feather name="arrow-down-left" size={24} color="red" />
                ) : (
                  <Feather name="arrow-up-right" size={24} color="#25D366" />
                )}
                <Text style={styles.difference}> {totalDifference}%</Text>
              </View>
              <Text style={styles.note}>
                {" "}
                {totalDifference < 0 ? "less" : "higher"} than previous month
              </Text>
            </View>
          )}
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Number of Expenses</Text>
          <Text style={styles.number}>{expenses.length}</Text>
          {!isNaN(
            expenses.length / previousExpenses.numberOfPreviousMonthExpenses
          ) && (
            <View style={styles.innerRow}>
              <View
                style={[
                  styles.differenceContainer,
                  {
                    backgroundColor:
                      expenses.length /
                        previousExpenses.numberOfPreviousMonthExpenses <
                      0
                        ? "rgba(255, 0, 0, 0.1)"
                        : "rgba(37, 211, 102, 0.1)",
                  },
                ]}
              >
                {expenses.length /
                  previousExpenses.numberOfPreviousMonthExpenses <
                0 ? (
                  <Feather name="arrow-down-left" size={24} color="red" />
                ) : (
                  <Feather name="arrow-up-right" size={24} color="#25D366" />
                )}
                <Text style={styles.difference}>
                  {" "}
                  {(
                    expenses.length /
                    previousExpenses.numberOfPreviousMonthExpenses
                  ).toFixed(2) * 100}
                  %
                </Text>
              </View>
              <Text style={styles.note}>
                {" "}
                {expenses.length /
                  previousExpenses.numberOfPreviousMonthExpenses <
                0
                  ? "less"
                  : "higher"}{" "}
                than previous month
              </Text>
            </View>
          )}
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Average / Expense</Text>
          <Text style={styles.number}>
            {numberWithComa(+average.toFixed(2))} {expenses[0].currency}
          </Text>
          {!isNaN(averageDifference) && (
            <View style={styles.innerRow}>
              <View
                style={[
                  styles.differenceContainer,
                  {
                    backgroundColor:
                      averageDifference < 0
                        ? "rgba(255, 0, 0, 0.1)"
                        : "rgba(37, 211, 102, 0.1)",
                  },
                ]}
              >
                {averageDifference < 0 ? (
                  <Feather name="arrow-down-left" size={24} color="red" />
                ) : (
                  <Feather name="arrow-up-right" size={24} color="#25D366" />
                )}
                <Text style={styles.difference}> {averageDifference}%</Text>
              </View>
              <Text style={styles.note}>
                {" "}
                {averageDifference < 0 ? "less" : "higher"} than previous month
              </Text>
            </View>
          )}
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Claimed Expenses</Text>
          <Text style={styles.number}>
            {expenses.filter((a) => a.isClaimed === true).length}
          </Text>
          {!isNaN(claimedDifference) && (
            <View style={styles.innerRow}>
              <View
                style={[
                  styles.differenceContainer,
                  {
                    backgroundColor:
                      claimedDifference < 0
                        ? "rgba(255, 0, 0, 0.1)"
                        : "rgba(37, 211, 102, 0.1)",
                  },
                ]}
              >
                {claimedDifference < 0 ? (
                  <Feather name="arrow-down-left" size={24} color="red" />
                ) : (
                  <Feather name="arrow-up-right" size={24} color="#25D366" />
                )}
                <Text style={styles.difference}> {claimedDifference}%</Text>
              </View>
              <Text style={styles.note}>
                {" "}
                {claimedDifference < 0 ? "less" : "higher"} than previous month
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: globalWidth("1%"),
  },
  header: {
    fontFamily: "headers",
    color: Colors.appBlue,
    fontSize: globalWidth("1.2%"),
  },
  cotnainerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    marginTop: globalWidth("1.5%"),
  },
  card: {
    width: "22.5%",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#ccc",
    justifyContent: "space-evenly",
    height: globalWidth("9%"),
  },
  innerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  differenceContainer: {
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("0.9%"),
    color: "#ccc",
    marginLeft: globalWidth("0.5%"),
  },
  number: {
    fontFamily: "numbers",
    fontSize: globalWidth("1.2%"),
    color: Colors.font,
    marginLeft: globalWidth("0.5%"),
    textAlign: "center",
  },
  note: {
    fontFamily: "robotoRegular",
  },
});

export const ExpensesOverViewOptions = (navData) => {
  return {
    headerTitle: "ExpensesOverView",
  };
};

export default ExpensesOverView;
