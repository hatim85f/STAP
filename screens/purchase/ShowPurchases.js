import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../../store/auth/authActions";
import * as purchaseActions from "../../store/purchases/purchaseActions";

import { months } from "../../components/helpers/months";
import { years } from "../../components/helpers/years";
import DropWithButton from "../../components/DropWithButton";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { title } from "process";
import PurchasingList from "./PurchasingList";

const ShowPurchases = (props) => {
  const { purchases } = useSelector((state) => state.purchases);

  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

  // ===============================================SEARCH====================================================if

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
    dispatch(purchaseActions.getPurchase(startMonth, endMonth, year)).then(
      () => {
        setIsLoading(false);
      }
    );
  };

  //  ============================================GETTING PURCHASE DETAILS==============================================

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.header}>Filter</Text>
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
      {purchases.length > 0 && <PurchasingList purchases={purchases} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: globalWidth("2%"),
  },
  header: {
    fontSize: globalWidth("1.5%"),
    fontFamily: "open-sans-bold",
    fontStyle: "italic",
    color: Colors.appBlue,
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

export default ShowPurchases;
