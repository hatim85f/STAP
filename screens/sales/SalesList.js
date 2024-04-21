import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import numberWithComa from "../../components/helpers/numberWithComa";

import { AntDesign } from "@expo/vector-icons";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import Colors from "../../constants/Colors";

import * as salesActions from "../../store/sales/salesActions";
import moment from "moment";

const SalesList = (props) => {
  const { list, clearList } = props;

  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let total = 0;
    list.forEach((item) => {
      total += parseFloat(item.itemValue);
    });
    setTotal(total);

    const currency = list[0].currencySymbol;
    setCurrency(currency);
  }, [list]);

  const dispatch = useDispatch();

  const submit = () => {
    // using moment get the first day of the month
    const startDate = moment().startOf("month").format("DD/MM/YYYY");
    const startToISo = moment().startOf("month").toISOString();
    // using moment get the last day of the month
    const endDate = moment().endOf("month").format("DD/MM/YYYY");
    const endToISo = moment().endOf("month").toISOString();

    setIsLoading(true);
    const data = {
      businessId: list[0].businessId,
      sales: list,
      salesValue: total,
    };
    dispatch(
      salesActions.addSales(
        data,
        `Sales of ${moment(new Date()).format("DD/MM/YY")} number ${Math.random(
          new Date()
        )}`,
        startToISo,
        endToISo
      )
    ).then(() => {
      setIsLoading(false);
      clearList();
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={[
            styles.button,
            {
              justifyContent: "center",
              alignItems: "center",
              height: globalHeight("4%"),
            },
          ]}
        >
          <ActivityIndicator size="small" color={Colors.font} />
        </View>
      ) : (
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.titleStyle}
          title="Submit"
          onPress={submit}
        />
      )}
      <View style={[styles.mainContainer, styles.header]}>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerTitle}> Product Name </Text>
        </View>
        <View
          style={{
            width: "13%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerTitle}> Quantity </Text>
        </View>
        <View
          style={{
            width: "13%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerTitle}> Total Quantity </Text>
        </View>
        <View
          style={{
            width: "15.5%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerTitle}> Selling Price </Text>
        </View>
        <View
          style={{
            width: "15.5%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerTitle}> Value </Text>
        </View>
        <View
          style={{
            width: "13%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerTitle}> Delete </Text>
        </View>
      </View>
      {list.map((item, index) => {
        return (
          <View
            style={[styles.mainContainer, styles.itemContainer]}
            key={index}
          >
            <View
              style={{
                width: "30%",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Text style={styles.text}>
                {" "}
                {index + 1}) {item.productName}{" "}
              </Text>
            </View>
            <View
              style={{
                width: "13%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.number}> {item.quantity} </Text>
            </View>
            <View
              style={{
                width: "13%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.value}>
                {" "}
                {isNaN(item.totalQuantity)
                  ? item.quantity
                  : item.totalQuantity}{" "}
              </Text>
            </View>
            <View
              style={{
                width: "15.5%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.number}> {item.sellingPrice} </Text>
            </View>
            <View
              style={{
                width: "15.5%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.value}>
                {" "}
                {numberWithComa(parseFloat(item.itemValue).toFixed(2))}{" "}
                {item.currencySymbol}{" "}
              </Text>
            </View>
            <View
              style={{
                width: "13%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => props.onDelete(index)}>
                <AntDesign
                  name="closecircle"
                  size={globalWidth("1.5%")}
                  color="#ff0055"
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
      >
        <Text style={styles.number}>
          {" "}
          Total Value : {numberWithComa(parseFloat(total).toFixed(2))}{" "}
          {currency}{" "}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    backgroundColor: Colors.haizyColor,
    borderWidth: 1,
    borderColor: Colors.font,
  },
  headerTitle: {
    color: Colors.font,
    fontSize: globalWidth("1%"),
    fontWeight: "bold",
    padding: globalWidth("1%"),
    textAlign: "center",
  },
  text: {
    color: Colors.font,
    fontSize: globalWidth("1%"),
    padding: globalWidth("1%"),
    textAlign: "center",
  },
  number: {
    color: Colors.font,
    fontSize: globalWidth("1%"),
    padding: globalWidth("1%"),
    textAlign: "center",
    fontStyle: "italic",
    fontFamily: "open-sans-bold",
  },
  itemContainer: {
    backgroundColor: "#FAF9F6",
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.haizyColor,
    borderRadius: 5,
    margin: globalWidth("1%"),
    width: "40%",
    alignSelf: "center",
  },
  titleStyle: {
    color: Colors.primary,
    fontSize: globalWidth("1%"),
    fontWeight: "bold",
    fontFamily: "open-sans-bold",
  },
});

export const SalesListOptions = (navData) => {
  return {
    headerTitle: "SalesList",
  };
};

export default SalesList;
