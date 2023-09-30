import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Octicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { isTablet, isWeb } from "../../constants/device";

const PricingCard = (props) => {
  const { pricingPackage } = props;
  const [priceShow, setPriceShow] = useState("Monthly");

  const {
    features,
    limits,
    name,
    subTitle,
    price,
    prices,

    backgroundColor,
  } = pricingPackage;

  const { visualizedReport } = features;

  return (
    <View style={styles.container}>
      <View style={[styles.mainCard, { borderColor: backgroundColor }]}>
        <View style={[styles.cardHeader, { backgroundColor: backgroundColor }]}>
          <Text style={styles.packageName}>{name}</Text>
          <Text style={styles.subTitle}> {subTitle} </Text>
        </View>

        <View style={styles.lowerContent}>
          <View
            style={[styles.lowerContainer, { minHeight: globalHeight("25%") }]}
          >
            <Text style={styles.details}>
              Businesses:{" "}
              <Text style={styles.detailsValue}>
                {limits.businesses > 100 ? "Unlimited" : limits.businesses}
              </Text>
            </Text>
            <Text style={styles.details}>
              Cost for Business:{" "}
              <Text style={styles.detailsValue}>
                {limits.valuePerBusiness} $ / month
              </Text>
            </Text>
            <Text style={styles.details}>
              Team Members:{" "}
              <Text style={styles.detailsValue}>
                {limits.teamMembers > 100 ? "Unlimited" : limits.teamMembers}
              </Text>
            </Text>
            <Text style={styles.details}>
              Admins:{" "}
              <Text style={styles.detailsValue}>
                {limits.admins > 100 ? "Unlimited" : limits.admins}
              </Text>
            </Text>
            <Text style={styles.details}>
              Products:{" "}
              <Text style={styles.detailsValue}>
                {limits.products > 100 ? "Unlimited" : limits.products}
              </Text>
            </Text>
            <Text style={styles.details}>
              Number of Clients:{" "}
              <Text style={styles.detailsValue}>
                {limits.clients > 100 ? "Unlimited" : limits.clients}
              </Text>
            </Text>
          </View>
          <View
            style={[styles.lowerContainer, { minHeight: globalHeight("25%") }]}
          >
            <View
              style={[
                styles.titleContainer,
                { backgroundColor: backgroundColor },
              ]}
            >
              <Text style={styles.title}> Visualized Reports </Text>
            </View>
            {visualizedReport.map((report, index) => {
              return (
                <View key={index} style={styles.itemsRow}>
                  <Octicons name="dot-fill" size={12} color={Colors.primary} />
                  <Text
                    style={[
                      styles.detailsValue,
                      {
                        fontFamily: "headers",
                        marginLeft: globalWidth("1%"),
                        fontSize: isWeb() ? 20 : 14,
                      },
                    ]}
                  >
                    {report}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.lowerContainer}>
            <View
              style={[
                styles.titleContainer,
                { backgroundColor: backgroundColor },
              ]}
            >
              <Text style={styles.title}> Features </Text>
            </View>
            <Text style={styles.details}>
              Inventory:{" "}
              <Text style={styles.detailsValue}>
                {features.inventory ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.details}>
              Manufacturing Management:{" "}
              <Text style={styles.detailsValue}>
                {features.manufacturing_management ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.details}>
              Supply Chain Management:{" "}
              <Text style={styles.detailsValue}>
                {features.supply_chain_management ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.details}>
              Marketing Management:{" "}
              <Text style={styles.detailsValue}>
                {features.marketing_management ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.details}>
              Invoicing:{" "}
              <Text style={styles.detailsValue}>
                {features.invoicing ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.details}>
              Payment Link Creation:{" "}
              <Text style={styles.detailsValue}>
                {features.payment_link_creation ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.details}>
              Sales Management:{" "}
              <Text style={styles.detailsValue}>
                {features.sales_management ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.details}>
              CRM:{" "}
              <Text style={styles.detailsValue}>
                {features.crm ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.details}>
              Team Target:{" "}
              <Text style={styles.detailsValue}>
                {features.team_target ? "Yes" : "No"}
              </Text>
            </Text>
            <Text style={styles.details}>
              Products Target:{" "}
              <Text style={styles.detailsValue}>
                {features.products_target ? "Yes" : "No"}
              </Text>
            </Text>
          </View>
          {name !== "Free Trial" && (
            <View style={styles.lowerContainer}>
              <View
                style={[
                  styles.titleContainer,
                  { backgroundColor: backgroundColor },
                ]}
              >
                <Text style={styles.title}> Price </Text>
              </View>
              <Text style={styles.details}>
                Business Owner Membership:{" "}
                <Text style={styles.detailsValue}>
                  {prices.businessOwner} $ / month
                </Text>
              </Text>
              <Text style={styles.details}>
                Team Member Membership:{" "}
                <Text style={styles.detailsValue}>
                  {prices.teamMember} $ / month
                </Text>
              </Text>
              <Text style={styles.details}>
                Admin Membership:{" "}
                <Text style={styles.detailsValue}>
                  {prices.admin} $ / month
                </Text>
              </Text>
            </View>
          )}
          {name !== "Free Trial" && (
            <View style={styles.lowerContainer}>
              <View
                style={[
                  styles.titleContainer,
                  { backgroundColor: backgroundColor },
                ]}
              >
                <Text style={styles.title}>Package Price</Text>
              </View>
              <View style={[styles.buttonsRow, styles.lowerContainer]}>
                <Button
                  title="Yearly"
                  onPress={() => setPriceShow("Yearly")}
                  buttonStyle={[
                    styles.smallButton,
                    {
                      backgroundColor:
                        priceShow === "Yearly" ? backgroundColor : "white",
                      borderColor:
                        priceShow === "Yearly" ? "white" : backgroundColor,
                    },
                  ]}
                  titleStyle={[
                    styles.smallTitle,
                    {
                      color: priceShow === "Yearly" ? "white" : Colors.primary,
                    },
                  ]}
                />
                <Button
                  title="Monthly"
                  onPress={() => setPriceShow("Monthly")}
                  buttonStyle={[
                    styles.smallButton,
                    {
                      backgroundColor:
                        priceShow === "Monthly" ? backgroundColor : "white",
                      borderColor:
                        priceShow === "Monthly" ? "white" : backgroundColor,
                    },
                  ]}
                  titleStyle={[
                    styles.smallTitle,
                    {
                      color: priceShow === "Monthly" ? "white" : Colors.primary,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.details, { textAlign: "center" }]}>
                {priceShow} Price:{" "}
                <Text style={styles.price}>
                  {priceShow === "Monthly" ? price.monthly : price.yearly} $ /{" "}
                  {priceShow === "Monthly" ? "month" : "year"}
                </Text>
              </Text>
            </View>
          )}
        </View>
        <Button
          title="Learn More"
          buttonStyle={{
            backgroundColor: backgroundColor,
            borderRadius: 10,
            marginVertical: 10,
            width: "90%",
            alignSelf: "center",
          }}
          onPress={() => {
            props.navigation.navigate("Payment", {
              packageId: pricingPackage._id,
              type: priceShow,
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainCard: {
    flex: 1,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
    margin: 10,
    borderWidth: 1,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    width: isWeb()
      ? globalWidth("18.5%")
      : isTablet()
      ? globalWidth("45%")
      : globalWidth("70%"),
  },
  icon: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  cardHeader: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2.5,
  },
  lowerContainer: {
    padding: 10,
  },
  lowerContent: {
    flex: 1,
  },
  details: {
    fontFamily: "headers",
    fontSize: isWeb() ? 16 : 14,
    lineHeight: 25,
  },
  detailsValue: {
    color: Colors.primary,
    fontSize: isWeb() ? 16 : 14,
    lineHeight: 25,
  },
  itemsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  packageName: {
    color: "white",
    fontFamily: "headers",
    fontSize: isWeb() ? 24 : 18,
  },
  subTitle: {
    color: "black",
    fontFamily: "headers",
    fontSize: isWeb() ? 16 : 14,
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },
  titleContainer: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
    borderRadius: 3,
  },
  title: {
    color: "white",
    fontFamily: "headers",
    fontSize: isWeb() ? 20 : 16,
    marginVertical: 3,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: isWeb() ? "60%" : "80%",
    alignSelf: "center",
  },
  smallButton: {
    backgroundColor: "white",
    width: isWeb() ? 100 : isTablet() ? 90 : 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  smallTitle: {
    color: Colors.primary,
    fontFamily: "headers",
    fontSize: isWeb() ? 16 : isTablet() ? 14 : 12,
  },
});

export const PricingCardOptions = (navData) => {
  return {
    headerTitle: "PricingCard",
  };
};

export default PricingCard;
