import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import { TouchableOpacity } from "react-native";
import { globalHeight } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import SupplierAddition from "./SupplierAddition";
import Suppliers from "./Suppliers";

import * as authActions from "../../store/auth/authActions";

const SupplierMainScreen = (props) => {
  const [supplierNav, setSupplierNav] = useState("list");

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
              supplierNav === "list"
                ? styles.selectedTitle
                : styles.titleContainer
            }
            onPress={() => setSupplierNav("list")}
          >
            <Text
              style={[
                styles.title,
                {
                  color: supplierNav === "list" ? "white" : "black",
                },
              ]}
            >
              Suppliers List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              supplierNav === "add"
                ? styles.selectedTitle
                : styles.titleContainer
            }
            onPress={() => setSupplierNav("add")}
          >
            <Text
              style={[
                styles.title,
                {
                  color: supplierNav === "add" ? "white" : "black",
                },
              ]}
            >
              Add New Supplier
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightNav}>
          {supplierNav === "list" ? <Suppliers /> : <SupplierAddition />}
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

export const SupplierMainScreenOptions = (navData) => {
  return {
    headerTitle: "SupplierMainScreen",
  };
};

export default SupplierMainScreen;
