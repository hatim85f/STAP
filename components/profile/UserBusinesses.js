import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import { Image } from "react-native";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { isTablet, isWeb } from "../../constants/device";

const UserBusinesses = (props) => {
  const { business } = props;
  return (
    <View style={styles.container}>
      {business && business.length > 0 ? (
        <View style={styles.titleWithData}>
          {business.map((business, index) => {
            return (
              <View style={styles.businessContainer} key={index}>
                <Card style={styles.cardRow}>
                  <Image
                    source={{ uri: business.businessLogo }}
                    style={styles.logo}
                  />
                  <Text style={styles.data}>{business.businessName}</Text>
                  <Text style={[styles.data, { color: Colors.font }]}>
                    {business.numberOfEmployees}{" "}
                    {business.numberOfEmployees > 1 ? "Users" : "User"}{" "}
                  </Text>
                </Card>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>
            No Businesses added yet, if You wish to add a new Business go to{" "}
            <Text style={{ fontStyle: "italic", color: Colors.primary }}>
              Add New Business
            </Text>{" "}
            Section and add the new Business
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
  businessContainer: {
    width: isWeb() ? "70%" : "95%",
    alignSelf: "center",
  },
  number: {
    fontFamily: "numbers",
    fontSize: isWeb()
      ? globalWidth("1.2%")
      : isTablet()
      ? globalWidth("3%")
      : globalWidth("4.5%"),
    marginTop: 15,
    marginLeft: isWeb() ? globalWidth("6%") : globalWidth("5%"),
  },
  logo: {
    width: isWeb()
      ? globalWidth("4%")
      : isTablet()
      ? globalWidth("9%")
      : globalWidth("10%"),
    height: isWeb()
      ? globalWidth("4%")
      : isTablet()
      ? globalWidth("9%")
      : globalWidth("10%"),
    borderRadius: isWeb()
      ? globalWidth("2%")
      : isTablet()
      ? globalWidth("4.5%")
      : globalWidth("7.5%"),
    borderColor: "navy",
    borderWidth: 2.5,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    borderWidth: 0,
    borderRadius: 8,
    height: globalHeight("10%"),
    width: "100%",
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    borderWidth: 0,
    borderRadius: 8,
    height: globalHeight("8%"),
    width: isWeb() ? "70%" : "90%",
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
});

export const UserBusinessesOptions = (navData) => {
  return {
    headerTitle: "UserBusinesses",
  };
};

export default UserBusinesses;
