import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { isTablet, isWeb } from "../../constants/device";
import Colors from "../../constants/Colors";
import numberWithComa from "../helpers/numberWithComa";
import moment from "moment";

const UserPayments = (props) => {
  const { payment, profile } = props;

  return (
    <View style={styles.container}>
      {payment && payment.length > 0 ? (
        <View style={styles.listContainer}>
          {payment.map((item, index) => {
            return (
              <Card style={styles.contentRow} key={index}>
                <Text style={styles.title}>
                  Amount :{" "}
                  <Text style={styles.data}>
                    {" "}
                    {numberWithComa(item.amount)} $
                  </Text>{" "}
                </Text>
                <Text style={styles.title}>
                  Payment Date :{" "}
                  <Text style={styles.data}>
                    {" "}
                    {moment(item.paymentDate).format("DD/MM/YY hh:mm A ")}
                  </Text>{" "}
                </Text>
                {!item.isCancelled && (
                  <Text style={styles.title}>
                    Next Billing :{" "}
                    <Text style={styles.data}> {item.nextBillingDate}</Text>{" "}
                  </Text>
                )}
                <Text style={styles.title}>
                  Paid For :{" "}
                  <Text style={styles.data}> {item.packageName} Package </Text>{" "}
                </Text>
                <Text style={styles.title}>
                  Subscription Type :{" "}
                  <Text style={styles.data}>
                    {" "}
                    {!item.isCancelled ? "Active" : "Deactivated"}
                  </Text>{" "}
                </Text>
              </Card>
            );
          })}
        </View>
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>
            No payments done yet, if You wish to subscripe to any of the
            available packages go to{" "}
            <Text style={{ fontStyle: "italic", color: Colors.primary }}>
              Packages
            </Text>{" "}
            Section and subscripe
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  contentRow: {
    alignSelf: "center",
    padding: 10,
    borderWidth: 0,
    borderRadius: 8,
    width: isWeb() ? "70%" : "90%",
    marginBottom: 10,
  },
  noData: {
    width: "90%",
    alignSelf: "center",
  },
  noDataText: {
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1.2%")
      : isTablet()
      ? globalWidth("2.5%")
      : globalWidth("4.5%"),
    textShadowColor: "white",
    textShadowRadius: 1,
    textAlign: "center ",
  },
  title: {
    lineHeight: 30,
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1%")
      : isTablet()
      ? globalWidth("2%")
      : globalWidth("3"),
    color: Colors.font,
  },
  data: {
    color: "#000",
  },
});

export const UserPaymentsOptions = (navData) => {
  return {
    headerTitle: "UserPayments",
  };
};

export default UserPayments;
