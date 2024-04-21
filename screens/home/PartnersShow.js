import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import numberWithComa from "../../components/helpers/numberWithComa";
import Colors from "../../constants/Colors";

const PartnersShow = (props) => {
  const { partners, profit } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Partners </Text>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {partners.map((partner, index) => {
          return (
            <View style={styles.partnerContainer} key={index}>
              <View style={styles.partnerHeader}>
                <Image
                  source={{ uri: partner.profileImage }}
                  style={styles.image}
                />
                <Text style={styles.name}>{partner.name}</Text>
              </View>
              <View style={styles.line} />
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Profit</Text>
                <Text style={styles.value}>
                  {numberWithComa(parseFloat(partner.partnerProfit).toFixed(2))}{" "}
                  {partner.currencyCode}
                </Text>
              </View>
              <View style={styles.line} />
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Percentage</Text>
                <Text style={styles.value}> {partner.percentage * 100}% </Text>
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
    width: globalWidth("30%"),
    height: globalHeight("52.5%"),
    borderWidth: 1,
    borderColor: "black",
    padding: globalWidth("1%"),
    borderRadius: 3,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontFamily: "openSansBold",
    fontSize: globalWidth("1.5%"),
    color: Colors.appBlue,
    marginBottom: globalHeight("1%"),
    fontStyle: "italic",
  },
  image: {
    width: globalWidth("4%"),
    height: globalWidth("4%"),
    borderRadius: globalWidth("2%"),
  },
  name: {
    fontFamily: "openSansBold",
    fontSize: globalWidth("1.1%"),
    color: "black",
    fontStyle: "italic",
  },
  innerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: globalHeight("1%"),
  },
  detailsContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  title: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("1%"),
    color: "black",
    fontStyle: "italic",
    marginVertical: globalHeight("0.5%"),
  },
  value: {
    fontFamily: "robotoRegular",
    fontSize: globalWidth("1%"),
    color: Colors.primary,
    fontStyle: "italic",
  },
  line: {
    width: 2,
    height: globalHeight("3%"),
    backgroundColor: "black",
  },
  partnerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

export const PartnersShowOptions = (navData) => {
  return {
    headerTitle: "PartnersShow",
  };
};

export default PartnersShow;
