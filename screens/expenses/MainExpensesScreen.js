import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import ExpenseLeftMenu from "./ExpenseLeftMenu";
import { globalHeight } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import AddFixedExpenses from "./AddFixedExpenses";
import AddMarketingExpenses from "./AddMarketingExpenses";
import AddVariableExpenses from "./AddVariableExpenses";
import ManageFixedExpenses from "./ManageFixedExpenses";
import ManageVariableExpenses from "./ManageVariableExpenses";
import MangeMarketingExpenses from "./MangeMarketingExpenses";
import * as authActions from "../../store/auth/authActions";

const MainExpensesScreen = (props) => {
  const [direction, setDirection] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        if (Platform.OS === "web") {
          storedUserDetails = window.localStorage.getItem("userDetails");
        } else {
          storedUserDetails = await AsyncStorage.getItem("userDetails");
        }

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

  const ShownItem = () => {
    if (direction === "add-fixed") {
      return <AddFixedExpenses />;
    } else if (direction === "add-variable") {
      return <AddVariableExpenses />;
    } else if (direction === "add-marketing") {
      return <AddMarketingExpenses />;
    } else if (direction === "manage-fixed") {
      return <ManageFixedExpenses />;
    } else if (direction === "manage-variable") {
      return <ManageVariableExpenses />;
    } else if (direction === "manage-marketing") {
      return <MangeMarketingExpenses />;
    } else {
      return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.leftRow}>
            <ExpenseLeftMenu
              getDirection={(direction) => setDirection(direction)}
            />
            <View style={styles.border} />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <ShownItem />
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
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: "20%",
    height: globalHeight("85%"),
    backgroundColor: Colors.haizyColor,
  },
  leftRow: {
    flexDirection: "row",
    width: "100%",
  },
  border: {
    backgroundColor: Colors.primary,
    height: globalHeight("85%"),
    width: "2%",
    marginRight: 0,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  rightContainer: {
    flex: 1,
    width: "80%",
    height: globalHeight("85%"),
    backgroundColor: "white",
  },
});

export const MainExpensesScreenOptions = (navData) => {
  return {
    headerTitle: "MainExpensesScreen",
  };
};

export default MainExpensesScreen;
