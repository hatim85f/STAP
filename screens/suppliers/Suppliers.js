import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as suppliersActions from "../../store/suppliers/suppliersActions";
import * as authActions from "../../store/auth/authActions";

import Loader from "../../components/Loader";
import SupplierShow from "./SupplierShow";
import { globalWidth } from "../../constants/globalWidth";

const Suppliers = (props) => {
  const { suppliers } = useSelector((state) => state.suppliers);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const dispatch = useDispatch();

  //=========================================================GET USER BACK========================================================

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

  //   =========================================================GET SUPPLIERS========================================================

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Getting Supplier Data");
    dispatch(suppliersActions.getSuppliers()).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  }, [dispatch]);

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.row}>
          {suppliers.length > 0 &&
            suppliers.map((item, index) => {
              return <SupplierShow key={index} supplier={item} />;
            })}
        </View>
      </ScrollView>
      {suppliers.length === 0 && (
        <View style={styles.centered}>
          <Text style={styles.note}>No Suppliers to Show</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  centered: {
    flex: 1,
  },
  note: {
    fontSize: globalWidth("1.2%"),
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
  },
});

export default Suppliers;
