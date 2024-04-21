import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";

import * as inventoryActions from "../../store/inventory/inventoryActions";
import * as authActions from "../../store/auth/authActions";

import { months } from "../../components/helpers/months";
import { years } from "../../components/helpers/years";
import DropWithButton from "../../components/DropWithButton";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import InventoryList from "./InventoryList";

const InventoryScreen = (props) => {
  const { inventory } = useSelector((state) => state.inventory);

  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const dispatch = useDispatch();

  // getting user back if he is logged out for any reason except he pressed logout button
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        storedUserDetails = window.localStorage.getItem("userDetails");
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

  //   ==========================================================HANDLING FILTERS========================================================

  const changeStartMonth = (data) => {
    const month = months.indexOf(data) + 1;

    const monthData = month < 10 ? `0${month}` : month;

    setStartMonth(monthData);
  };

  const changeEndMonth = (data) => {
    const month = months.indexOf(data) + 1;

    const monthData = month < 10 ? `0${month}` : month;

    setEndMonth(monthData);
  };

  const submitSearch = () => {
    setIsLoading(true);
    setLoadingMessage("Getting Inventory Details");
    dispatch(inventoryActions.getInventory(startMonth, endMonth, year)).then(
      () => {
        setIsLoading(false);
        setLoadingMessage("");
      }
    );
  };

  //   =======================================================RENDERING=======================================================

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <View style={styles.filterContainer}>
        <Text style={styles.header}>Filters</Text>
        <View style={styles.filterRow}>
          <View>
            <DropWithButton
              list={months.map((a) => {
                return { label: a, value: a };
              })}
              buttonTitle="Start Month"
              getSelection={(data) => changeStartMonth(data)}
              rounded
              width={globalWidth("20%")}
              isOpened={(data) => setOpen(data)}
            />
          </View>
          <View>
            <DropWithButton
              list={months.map((a) => {
                return { label: a, value: a };
              })}
              buttonTitle="End Month"
              getSelection={(data) => changeEndMonth(data)}
              rounded
              width={globalWidth("20%")}
              isOpened={(data) => setOpen(data)}
            />
          </View>
          <View>
            <DropWithButton
              list={years}
              buttonTitle="Year"
              getSelection={setYear}
              rounded
              width={globalWidth("20%")}
              isOpened={(data) => setOpen(data)}
            />
          </View>
          {isLoading ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          ) : (
            <Button
              buttonStyle={styles.button}
              titleStyle={styles.title}
              onPress={submitSearch}
              title="Filter"
              loading={isLoading}
            />
          )}
        </View>
      </View>
      {inventory.length > 0 && <InventoryList inventory={inventory} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  filterContainer: {
    padding: globalWidth("0.5%"),
    width: "95%",
    alignSelf: "center",
  },
  header: {
    fontSize: globalWidth("1.5%"),
    fontFamily: "open-sans-bold",
    fontStyle: "italic",
    color: Colors.appBlue,
    marginBottom: globalHeight("1%"),
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: "transparent",
    borderColor: Colors.font,
    borderWidth: 1,
    width: globalWidth("20%"),
    height: globalWidth("2.3%"),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    color: Colors.font,
    fontSize: globalWidth("1%"),
    fontStyle: "italic",
  },
});

export default InventoryScreen;
