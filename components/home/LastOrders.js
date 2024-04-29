import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native";
import numberWithComa from "../helpers/numberWithComa";
import moment from "moment";

const LastOrders = (props) => {
  const { lastOrders } = props;

  const [totalSalesValue, setTotalSalesValue] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (lastOrders && lastOrders.length > 0) {
      setTotalSalesValue(lastOrders[0].totalSalesValue);
      setTotalItems(lastOrders[0].totalItems);
    }
  }, [lastOrders]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Last Transactions</Text>
      <View style={styles.row}>
        <View style={styles.salesContainer}>
          <Text style={styles.dataDetails}>
            Value: {numberWithComa(parseFloat(totalSalesValue).toFixed(0))}{" "}
          </Text>
        </View>
        <View style={styles.salesContainer}>
          <Text style={styles.dataDetails}>
            Total Items: {numberWithComa(parseFloat(totalItems).toFixed(0))}{" "}
          </Text>
        </View>
      </View>
      <View style={styles.headerView}>
        <View style={styles.sn}>
          <Text style={styles.data}>SN</Text>
        </View>
        <View style={[styles.details, { width: "30%" }]}>
          <Text style={styles.data}>Client Name</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.data}>Items #</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.data}>Value</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.data}>Date</Text>
        </View>
      </View>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {lastOrders[0]?.lastOrders.map((item, index) => {
          return (
            <View
              style={[
                styles.headerView,

                {
                  backgroundColor: index % 2 === 0 ? "#FFFFF3" : "#F0F0F0",
                },
              ]}
              key={index}
            >
              <View style={[styles.sn, styles.rowView]}>
                <Text style={[styles.data, styles.itemData]}>{index + 1}</Text>
              </View>
              <View style={[styles.details, styles.rowView, { width: "30%" }]}>
                <Text style={[styles.data, styles.itemData]}>
                  {item.clientName}
                </Text>
              </View>
              <View style={[styles.details, styles.rowView]}>
                <Text style={[styles.data, styles.itemData]}>
                  {item.numberOfItems}
                </Text>
              </View>
              <View style={[styles.details, styles.rowView]}>
                <Text style={[styles.data, styles.itemData]}>
                  {numberWithComa(parseFloat(item.salesValue).toFixed(0))}
                </Text>
              </View>
              <View style={[styles.details, styles.rowView]}>
                <Text style={[styles.data, styles.itemData]}>
                  {moment(item.date).format("DD/MM/YY")}
                </Text>
                <Text style={[styles.data, styles.itemData]}>
                  {moment(item.date).format("hh:mm a")}
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
    width: "30%",
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
    borderBottomLeftRadius: 10,
    paddingBottom: 0,
  },
  header: {
    fontSize: globalWidth("1.8% "),
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    fontStyle: "italic",
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
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dataDetails: {
    fontSize: globalWidth("1%"),
    fontStyle: "italic",
    fontFamily: "roboto",
    lineHeight: globalWidth("2.5%"),
    fontWeight: "bold",
    color: Colors.font,
  },
  rowView: {
    height: globalHeight("6%"),
    justifyContent: "center",
  },
});

export const LastOrdersOptions = (navData) => {
  return {
    headerTitle: "LastOrders",
  };
};

export default LastOrders;
