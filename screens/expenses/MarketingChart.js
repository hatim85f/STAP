import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import ColumnChart from "../../components/charts/ColumnChart";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

const MarketingChart = (props) => {
  const { expenses } = props;

  const [arrangedExpeses, setArrangedExpeses] = useState([]);
  const [totalValue, setTotalValue] = useState(null);
  const [productsExepnses, setProductsExepnses] = useState([]);

  useEffect(() => {
    if (expenses) {
      const expensesAmounts = expenses.map((expense) => expense.amount);

      const arrangedExpenses = expenses.reduce((acc, data) => {
        const found = acc.find(
          (item) => item.requestedById === data.requestedById
        );

        if (!found) {
          acc.push({
            requestedBy: data.requestedBy,
            amount: data.amount,
            name: data.requestedBy,
          });
        } else {
          found.amount += data.amount;
        }

        return acc;
      }, []);
      setArrangedExpeses(arrangedExpenses);

      const productsExpenses = expenses.reduce((acc, data) => {
        const found = acc.find((item) => item.productId === data.productId);

        if (!found) {
          acc.push({
            productName: data.productName,
            amount: data.amount,
            image: data.productImage,
          });
        } else {
          found.amount += data.amount;
        }

        return acc;
      }, []);

      setProductsExepnses(productsExpenses);
    }
  }, [expenses]);

  return (
    <View style={styles.container}>
      <ColumnChart
        categories={productsExepnses.map((a) => a.productName)}
        data={productsExepnses.map((a) => a.amount)}
        width={globalWidth("52%")}
        height={globalHeight("38%")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderColor: "#ccc",
    borderWidth: 1.5,
    width: globalWidth("52%"),
    borderRadius: 10,
  },
});

export const MarketingChartOptions = (navData) => {
  return {
    headerTitle: "MarketingChart",
  };
};

export default MarketingChart;
