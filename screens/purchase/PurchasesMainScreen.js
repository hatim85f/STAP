import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";

import * as authActions from "../../store/auth/authActions";
import { globalHeight } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import ShowPurchases from "./ShowPurchases";
import AddPurchase from "./AddPurchase";

const PurchasesMainScreen = (props) => {
  const [purchaseNav, setPurchaseNav] = useState("show");

  //=========================================================GET USER BACK========================================================

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails = window.localStorage.getItem("userDetails");

        if (storedUserDetails) {
          const parsedUserDetails = JSON.parse(storedUserDetails);

          if (parsedUserDetails.user) {
            dispatch(authActions.getUserIn(parsedUserDetails));
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <View style={styles.mainRow}>
        <View style={styles.leftNav}>
          <TouchableOpacity
            style={
              purchaseNav === "show"
                ? styles.selectedTitle
                : styles.titleContainer
            }
            onPress={() => setPurchaseNav("show")}
          >
            <Text
              style={[
                styles.title,
                {
                  color: purchaseNav === "show" ? "white" : "black",
                },
              ]}
            >
              Purchasing List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              purchaseNav === "add"
                ? styles.selectedTitle
                : styles.titleContainer
            }
            onPress={() => setPurchaseNav("add")}
          >
            <Text
              style={[
                styles.title,
                {
                  color: purchaseNav === "add" ? "white" : "black",
                },
              ]}
            >
              Add New Purchase
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightNav}>
          {purchaseNav === "show" ? (
            <ShowPurchases />
          ) : (
            <AddPurchase changePurchaseNav={() => setPurchaseNav("show")} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  leftNav: {
    width: "15%",
    height: globalHeight("85%"),
    backgroundColor: Colors.haizyColor,
    borderRightColor: Colors.primary,
    borderRightWidth: 5,
  },
  rightNav: {
    width: "85%",
    height: globalHeight("85%"),
  },
  titleContainer: {
    backgroundColor: Colors.lightBG,
    padding: 10,
    marginVertical: 5,
    width: "95%",
    alignSelf: "center",
    borderRadius: 5,
    borderColor: Colors.font,
    borderWidth: 1,
  },
  selectedTitle: {
    backgroundColor: Colors.primary,
    padding: 10,
    marginVertical: 5,
    width: "95%",
    alignSelf: "center",
    borderRadius: 5,
    borderColor: Colors.font,
    borderWidth: 1,
  },
  title: {
    color: "black",
    fontFamily: "HelveticaNeue",
    fontSize: globalHeight("2%"),
    fontStyle: "italic",
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default PurchasesMainScreen;
