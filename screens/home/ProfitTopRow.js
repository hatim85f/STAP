import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import numberWithComa from "../../components/helpers/numberWithComa";

import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import BoxItem from "./BoxItem";
import ItemChart from "./ItemChart";
import ColumnChart from "../../components/charts/ColumnChart";

const ProfitTopRow = (props) => {
  const { profit } = props;

  const [totalOutValues, settotalOutValues] = useState(0);

  const products = profit.map((a) => a.products).flat();

  useEffect(() => {
    const totalOutComes =
      profit[0].totalFixedExpenses +
      profit[0].variableExpenses +
      profit[0].totalMarketing +
      profit[0].totalProductCost;

    settotalOutValues(totalOutComes);
  }, [profit]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.sideBox}>
          <BoxItem
            title="Fixed Expenses"
            itemValue={profit[0].totalFixedExpenses}
            totalValue={totalOutValues}
          />
          <View style={styles.box}>
            <BoxItem
              title="Variable Expenses"
              itemValue={profit[0].variableExpenses}
              totalValue={totalOutValues}
            />
          </View>
        </View>
        <View style={styles.middleBox}>
          <ColumnChart
            categories={products.map((a) => a.productNickName)}
            data={products.map((a) => parseFloat(a.productProfit).toFixed(0))}
            width={globalWidth("66%")}
            height={globalWidth("18%")}
          />
        </View>
        <View style={styles.sideBox}>
          <BoxItem
            title="Marketing Expenses"
            itemValue={profit[0].totalMarketing}
            totalValue={totalOutValues}
          />
          <BoxItem
            title="Product Cost"
            itemValue={profit[0].totalProductCost}
            totalValue={totalOutValues}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: globalWidth("1%"),
  },
  topRow: {
    maxHeight: globalWidth("18%"),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  sideBox: {
    width: globalWidth("15%"),
    minHeight: globalWidth("18%"),
    justifyContent: "space-between",
  },
  middleBox: {
    width: globalWidth("66%"),
    maxHeight: globalWidth("18%"),
    minHeight: globalWidth("18%"),
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ProfitTopRow;
