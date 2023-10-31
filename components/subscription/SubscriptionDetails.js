import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native-elements";
import { Alert } from "react-native-web";
import { useDispatch, useSelector } from "react-redux";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { isTablet, isWeb } from "../../constants/device";
import Colors from "../../constants/Colors";
import Loader from "../Loader";
import moment from "moment";
import Card from "../Card";

import * as membershipActions from "../../store/membership/MembershipActions";
import WebAlert from "../webAlert/WebAlert";

const SubscriptionDetails = (props) => {
  const { profile } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  const cancelSubscription = () => {
    setShowAlert(true);
  };

  const cancelSubscriptionDetails = () => {
    setIsLoading(true);
    dispatch(membershipActions.cancelMembership(profile.packageId)).then(() => {
      setIsLoading(false);
      setShowAlert(false);
      props.navigation.navigate("Home");
    });
  };

  const upgradeSubscription = () => {
    window.location.href = `/packages/upgrade-details/${profile.packageId}`;
  };

  if (isLoading) {
    return <Loader center />;
  }
  return (
    <View style={styles.container}>
      <Card
        style={[styles.contentRow, { flexDirection: "column", padding: 0 }]}
      >
        <View
          style={[
            styles.packageHeader,
            { backgroundColor: profile.backgroundColor },
          ]}
        >
          <Text style={styles.packageName}> {profile.packageName} </Text>
        </View>
        <View style={styles.lowerDetails}>
          <Text
            style={[
              styles.number,
              {
                fontSize: isWeb()
                  ? globalWidth("1.2%")
                  : isTablet()
                  ? globalWidth("3%")
                  : globalWidth("4%"),
                marginLeft: 1,
              },
            ]}
          >
            Available Items to add:
          </Text>
          <View style={styles.lowerRow}>
            <Text style={styles.title}>
              Businesses :{" "}
              <Text style={styles.data}>
                {profile.eligibleBusinesses > 100
                  ? "Unlimited"
                  : profile.eligibleBusinesses}
              </Text>
            </Text>
            <Text style={styles.title}>
              Admins :{" "}
              <Text style={styles.data}>
                {profile.eligibleAdmins > 100
                  ? "Unlimited"
                  : profile.eligibleAdmins}
              </Text>
            </Text>
            <Text style={styles.title}>
              Clients :{" "}
              <Text style={styles.data}>
                {profile.eligibleClients > 100
                  ? "Unlimited"
                  : profile.eligibleClients}
              </Text>
            </Text>
            <Text style={styles.title}>
              Employees :{" "}
              <Text style={styles.data}>
                {profile.eligibleEmployees > 100
                  ? "Unlimited"
                  : profile.eligibleEmployees}
              </Text>
            </Text>
            <Text style={styles.title}>
              Products :{" "}
              <Text style={styles.data}>
                {profile.eligibleProducts > 100
                  ? "Unlimited"
                  : profile.eligibleProducts}
              </Text>
            </Text>
          </View>
          <View
            style={[
              styles.packageDetails,
              { borderColor: profile.backgroundColor },
            ]}
          >
            <Text style={styles.title}>
              Start Date :{" "}
              <Text style={styles.data}>
                {moment(profile.membershipStart).format("DD/MM/YYYY")}
              </Text>
            </Text>
            <Text style={styles.title}>
              End Date :{" "}
              <Text style={styles.data}>
                {moment(profile.membershipEnd).format("DD/MM/YYYY")}
              </Text>
            </Text>
            <View style={styles.buttonRow}>
              {profile.packageName !== "Golden" && (
                <Pressable style={styles.button} onPress={upgradeSubscription}>
                  <Text
                    style={[
                      styles.upgradeText,
                      {
                        color: profile.backgroundColor,
                        textDecorationColor: profile.backgroundColor,
                      },
                    ]}
                  >
                    Upgrade Subscription
                  </Text>
                </Pressable>
              )}
              <Pressable style={styles.button} onPress={cancelSubscription}>
                <Text style={styles.buttonText}>Cancel Subscription</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Card>
      <WebAlert
        showAlert={showAlert}
        title="Cancel Subscription"
        message={`Are you sure you want to cancel your subscription for ${profile.packageName} pacakge ?`}
        cancelText="No"
        okText="Yes"
        onCancel={() => setShowAlert(false)}
        onOk={cancelSubscriptionDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    borderWidth: 0,
    borderRadius: 8,
    width: isWeb() ? "85%" : "90%",
    overflow: "hidden",
  },
  number: {
    fontFamily: "numbers",
    fontSize: isWeb()
      ? globalWidth("1.2%")
      : isTablet()
      ? globalWidth("4%")
      : globalWidth("5.5%"),
    marginTop: 15,
    marginLeft: isWeb() ? globalWidth("6%") : 0,
  },
  packageHeader: {
    width: "100%",
    height: globalHeight("5%"),
    justifyContent: "center",
  },
  packageName: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1.2%")
      : isTablet()
      ? globalWidth("3.6%")
      : globalWidth("5%"),
    color: "white",
  },
  lowerDetails: {
    width: "100%",
    padding: 10,
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1%")
      : isTablet()
      ? globalWidth("3%")
      : globalWidth("4%"),
    color: "#000",
    margin: 5,
  },
  data: {
    color: Colors.primary,
  },
  packageDetails: {
    borderTopWidth: 1.5,
    paddingTop: 10,
    marginTop: 5,
  },
  button: {
    width: "25%",
    marginTop: 15,
    alignItems: "flex-end",
  },
  buttonText: {
    color: "blue",
    textDecorationColor: "blue",
    textDecorationLine: "underline",
    fontStyle: "italic",
    fontSize: globalWidth("1%"),
  },
  upgradeText: {
    textDecorationLine: "underline",
    fontStyle: "italic",
    fontSize: globalWidth("1%"),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default SubscriptionDetails;
