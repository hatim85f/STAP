import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import AchievementChart from "./AchievementChart";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

const SalesCharts = (props) => {
  const { salesData } = props;
  return (
    <View style={styles.container}>
      {salesData && (
        <FlatList
          data={salesData}
          keyExtractor={(item) => item.product.toString()}
          numColumns={3}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.smallContainer}>
                <AchievementChart
                  details={[1500, 2500]}
                  name={item.productNickName}
                  yaproductisName="Value $"
                  xaxisName=""
                  image={item.productImage}
                  totalSales={`${parseInt(item.salesValue).toFixed(0)}`}
                  totalTarget={`${parseInt(item.targetValue).toFixed(0)}`}
                  achievement={item.achievement}
                  secondColor={() => secondColor(item.achievement)}
                  currencySymbol={item.currencySymbol}
                  height={globalHeight("35%")}
                  width={globalWidth("20%")}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smallDataContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    height: "100%",
  },
  smallContainer: {
    padding: globalWidth("1%"),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginVertical: globalHeight("1%"),
  },
});
export default SalesCharts;
